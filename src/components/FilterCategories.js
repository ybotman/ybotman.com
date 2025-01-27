import React from "react"
import PropTypes from "prop-types"
import {
  Box,
  IconButton,
  Typography,
  Collapse,
  FormControlLabel,
  Checkbox,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu" // <— CHANGED
// Reusable component for filtering "categories"
function FilterCategories({ allCategories, selectedCategories, onChangeCategories }) {
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandToggle = () => {
    setExpanded((prev) => !prev)
  }

  const handleCategoryChange = (cat) => {
    onChangeCategories(cat)
  }

  return (
    <>
      {/* Hamburger button in bottom-left of header image */}
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

      {/* Collapsible overlay for checkboxes */}
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        // Example styling: a semi-transparent panel top-left
        sx={{
          position: "absolute",
          bottom: 70,
          left: 20,
          zIndex: 10,
          backgroundColor: "white",
          p: 2,
          borderRadius: 1,
          boxShadow: 3,
        }}
      >
        <Box sx={{ minWidth: 150 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Categories
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
  )
}

FilterCategories.propTypes = {
  allCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChangeCategories: PropTypes.func.isRequired,
}

export default FilterCategories