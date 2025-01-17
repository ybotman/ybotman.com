/**
 * scripts/importWordPressXML.js
 *
 * One-time script to parse a WordPress XML export and create
 * Markdown files + download images into your Gatsby project.
 *
 * Usage:
 *   node scripts/importWordPressXML.js
 */

const fs = require('fs-extra');
const path = require('path');
const { parseStringPromise } = require('xml2js');
const fetch = require('node-fetch');
const slugify = require('slugify');

// 1) CONFIGURE THESE PATHS:
const XML_FILE_PATH = path.join(
  __dirname,
  '..',
  'public',
  'theartofoverthinking.WordPress.2025-01-17.xml'
);
const OUTPUT_MARKDOWN_DIR = path.join(__dirname, '..', 'src', 'content', 'blog');
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

// 2) HELPER: Download image to local /public/images
async function downloadImage(url, filename) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`Failed to download image: ${url}, status ${res.status}`);
      return null;
    }
    const destPath = path.join(IMAGES_DIR, filename);
    await fs.ensureDir(path.dirname(destPath));
    const buffer = await res.buffer();
    await fs.writeFile(destPath, buffer);
    return `/images/${filename}`; // Return relative path used in frontmatter
  } catch (err) {
    console.error(`Error downloading image ${url}:`, err);
    return null;
  }
}

// 3) MAIN IMPORT FUNCTION
(async function importWordPressXML() {
  try {
    // Ensure our output directories exist
    await fs.ensureDir(OUTPUT_MARKDOWN_DIR);
    await fs.ensureDir(IMAGES_DIR);

    // Read the XML file
    const xmlContent = await fs.readFile(XML_FILE_PATH, 'utf8');
    const parsed = await parseStringPromise(xmlContent);

    // The relevant data is usually under rss > channel > item
    const items = parsed?.rss?.channel?.[0]?.item || [];
    console.log(`Found ${items.length} total <item> nodes in XML.`);

    // STEP A: Build a quick dictionary of attachments by post_id
    // so we can reference them if a post has a featured image ID, etc.
    const attachmentMap = {};
    for (let item of items) {
      const postType = item['wp:post_type']?.[0];
      if (postType === 'attachment') {
        const postId = item['wp:post_id']?.[0];
        // The direct image URL can be found in <wp:attachment_url>
        const attachmentUrl = item['wp:attachment_url']?.[0] || null;
        attachmentMap[postId] = {
          url: attachmentUrl,
          title: item['title']?.[0] || '',
        };
      }
    }

    // STEP B: Process actual blog posts
    let postCount = 0;

    for (let item of items) {
      const postType = item['wp:post_type']?.[0];
      if (postType !== 'post') {
        // Skip pages, attachments, or other content types
        continue;
      }

      const title = (item['title']?.[0] || 'Untitled').trim();
      const postId = item['wp:post_id']?.[0];
      const slugFromXml = item['wp:post_name']?.[0] || slugify(title, { lower: true });
      const date = item['wp:post_date']?.[0] || null; // "2025-01-17 18:27:27"
      const content = item['content:encoded']?.[0] || '';
      const categories = [];
      const tags = [];

      // Collect categories and tags from <category domain="category" ...> / <category domain="post_tag" ...>
      const wpCategories = item.category || [];
      wpCategories.forEach((cat) => {
        const domain = cat.$?.domain;
        const nicename = cat.$?.nicename || '';
        if (domain === 'category') {
          categories.push(nicename);
        } else if (domain === 'post_tag') {
          tags.push(nicename);
        }
      });

      // Attempt to find featured image via _thumbnail_id postmeta
      let featuredImagePath = null;
      const postMeta = item['wp:postmeta'] || [];
      const thumbnailMeta = postMeta.find(
        (m) => m['wp:meta_key']?.[0] === '_thumbnail_id'
      );
      if (thumbnailMeta) {
        const thumbId = thumbnailMeta['wp:meta_value']?.[0];
        // Does that ID exist in our attachment map?
        if (attachmentMap[thumbId]) {
          const imageUrl = attachmentMap[thumbId].url;
          if (imageUrl) {
            // Attempt to download it
            const fileExt = path.extname(imageUrl).split('?')[0] || '.jpg';
            const fileSlug = slugify(title, { lower: true, strict: true });
            const localFileName = `${fileSlug}-featured${fileExt}`;
            featuredImagePath = await downloadImage(imageUrl, localFileName);
          }
        }
      }

      // Prepare frontmatter
      const frontmatterLines = [];
      frontmatterLines.push('---');
      frontmatterLines.push(`title: "${title.replace(/"/g, '\\"')}"`);
      if (date) {
        frontmatterLines.push(`date: "${date.split(' ')[0]}"`); // just YYYY-MM-DD
      }
      frontmatterLines.push(`slug: "${slugFromXml}"`);
      if (categories.length > 0) {
        frontmatterLines.push(`categories: [${categories.map((c) => `"${c}"`).join(', ')}]`);
      }
      if (tags.length > 0) {
        frontmatterLines.push(`tags: [${tags.map((t) => `"${t}"`).join(', ')}]`);
      }
      if (featuredImagePath) {
        frontmatterLines.push(`featuredImg: "${featuredImagePath}"`);
      }
      frontmatterLines.push('---');

      // Body content
      const mdBody = frontmatterLines.join('\n') + '\n\n' + content + '\n';

      // Write out to a .md file, e.g., "2025-01-17-some-slug.md"
      const safeSlug = slugify(slugFromXml, { lower: true, strict: true });
      const fileName = `${safeSlug}.md`;
      const outPath = path.join(OUTPUT_MARKDOWN_DIR, fileName);
      await fs.writeFile(outPath, mdBody, 'utf8');

      postCount++;
      console.log(`✅ Created: ${fileName}`);
    }

    console.log(`\nImport complete! ${postCount} Markdown post(s) generated.`);
  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
})();
