import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';
import { Link } from 'gatsby';

function PostCard({ slug, title, excerpt, date, featuredImg }) {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardActionArea component={Link} to={`/blog/${slug}`}>
        {featuredImg && (
          <CardMedia
            component="img"
            height="140"
            image={featuredImg}
            alt={title}
          />
        )}
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {excerpt}
          </Typography>
          <Typography variant="caption" display="block">
            {date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

PostCard.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  featuredImg: PropTypes.string,
};

export default PostCard;
