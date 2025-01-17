import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Header({ siteTitle }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {siteTitle}
        </Typography>
        <Button color="inherit" href="/">Home</Button>
        <Button color="inherit" href="/blog">Blog</Button>
        <Button color="inherit" href="/tags">Tags</Button>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
};

export default Header;
