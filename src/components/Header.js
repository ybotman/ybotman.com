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
            src="/images/TAOOT2.jpeg"
            alt={siteTitle}
            style={{ width: "100%", display: "block" }}
          />
        </Link>
      </Toolbar>

      <Box textAlign="center" sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold" color="darkgrey" gutterBottom>
          This site is a dumping ground of all things that cant get out of my head.
        </Typography>
     <Typography
        variant="body2"
        color="lightgrey"
        sx={{ display: "inline-block", maxWidth: "600px", textAlign: "center" }}
      >
        I hope to capture these items somehow.  Then through more process of overthinging,  I will (may) get back to them and flush them out. Some are just ideas meant to be flushed out, and some just brain-fart thoughts that are meant to be just that. Dont fret - we dont get the time to "think long" all the time and this help me.  I hope it helps you too.
        </Typography>

      </Box>
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