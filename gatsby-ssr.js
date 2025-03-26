/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */
const React = require("react");

exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  // Set the lang attribute
  setHtmlAttributes({ lang: `en` });

  // Add Google Analytics scripts
  setHeadComponents([
    <script
      key="gtag-script"
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-MR3J47RQKJ"
    />,
    <script key="gtag-inline">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-MR3J47RQKJ');
      `}
    </script>,
  ]);
};