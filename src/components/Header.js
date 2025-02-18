// ybotman.com/src/components/Header.js
import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"            // <-- import Link
import { Box, AppBar, Toolbar, Typography } from "@mui/material"

function Header({ siteTitle }) {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ minHeight: "auto", padding: 0 }}>
        {/* Wrap the image in a Link */}
        <Link to="/" style={{ width: "100%", display: "block" }}>
<img
  src="/images/TAOOT3.jpeg"
  alt={siteTitle}
  style={{
    width: "60%", // Adjust to desired size (smaller than 100%)
    height: "auto", // Maintain aspect ratio
    display: "block",
    margin: "0 auto", // Centers horizontally
  }}
/>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: "YbotMan Blog",
}

export default Header