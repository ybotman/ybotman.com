import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box component="footer" sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="body2">
        © {new Date().getFullYear()} YbotMan.com - All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
