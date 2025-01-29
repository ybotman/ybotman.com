// ybotman.com/src/components/FilterMenu.js
import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  IconButton,
  Typography,
  Collapse,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function FilterMenu({
  allCategories,
  selectedCategories,
  onChangeCategories,
  searchQuery,
  onSearchChange,
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandToggle = () => {
    setExpanded((prev) => !prev);
  };

  // Handler for toggling a category
  const handleCategoryChange = (cat) => {
    onChangeCategories(cat);
  };

  // 2- or 3-column layout for categories?
  // Example: 3 columns
  const columns = 3;

  return (
    <>
      {/* Hamburger button (e.g., near bottom-left of the header image) */}
      <IconButton
        onClick={handleExpandToggle}
        aria-label="toggle filter"
        sx={{
          position: "absolute",
          bottom: 20,
          left: 20,
          zIndex: 10,
          backgroundColor: "#ffffffcc",
          "&:hover": {
            backgroundColor: "#ffffff",
          },
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Collapsible overlay for categories + search */}
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        sx={{
          position: "absolute",
          bottom: 70,
          left: 20,
          zIndex: 10,
          backgroundColor: "white",
          p: 2,
          borderRadius: 1,
          boxShadow: 3,
          maxWidth: 400,
        }}
      >
        <Box sx={{ minWidth: 150 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Filter & Search
          </Typography>

          {/* Text Search */}
          <TextField
            label="Search text"
            variant="outlined"
            size="small"
            fullWidth
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Categories
          </Typography>

          {/* Multi-column layout for categories */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${columns}, minmax(100px, 1fr))`,
              gap: 1,
            }}
          >
            {allCategories.map((cat) => (
              <FormControlLabel
                key={cat}
                label={cat}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                  />
                }
              />
            ))}
          </Box>
        </Box>
      </Collapse>
    </>
  );
}

FilterMenu.propTypes = {
  allCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChangeCategories: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
  onSearchChange: PropTypes.func,
};

export default FilterMenu;