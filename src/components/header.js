// ybotman.com/src/components/Header.js
import React from "react"
import PropTypes from "prop-types"
import { AppBar, Toolbar } from "@mui/material"

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
        {/* The wide header image */}
        <img
          src="/images/TAOOT2.jpeg"
          alt={siteTitle}
          style={{ width: "100%", display: "block" }}
        />
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: "YbotMan Blog", // or any fallback
}

export default Header
