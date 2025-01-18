// ybotman.com/src/components/FilterCategories.js
import React from "react"
import PropTypes from "prop-types"
import { Box, IconButton, Typography, Collapse, FormControlLabel, Checkbox } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

// Reusable component for filtering "categories"
function FilterCategories({ allCategories, selectedCategories, onChangeCategories }) {
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandToggle = () => {
    setExpanded((prev) => !prev)
  }

  // Handler for checkbox changes
  const handleCategoryChange = (cat) => {
    onChangeCategories(cat)
  }

  return (
    <Box sx={{ mb: 2 }}>
      {/* Toggle Button / Icon */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Categories
        </Typography>
        <IconButton onClick={handleExpandToggle} aria-label="toggle filter">
          <ExpandMoreIcon
            sx={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
          />
        </IconButton>
      </Box>

      {/* Collapsible section for checkboxes */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ display: "flex", flexWrap: "wrap", mt: 1, gap: 2 }}>
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
      </Collapse>
    </Box>
  )
}

FilterCategories.propTypes = {
  allCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChangeCategories: PropTypes.func.isRequired,
}

export default FilterCategories
