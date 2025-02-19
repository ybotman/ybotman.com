import React from "react"
import PropTypes from "prop-types"
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material"

function FilterMenu({
  allCategories,
  categoryCountMap,
  selectedCategories,
  onChangeCategories,
  searchQuery,
  onSearchChange,
}) {
  // Toggle a category
  const handleCategoryChange = (cat) => {
    onChangeCategories(cat)
  }

  return (
    <Box
      sx={{
        width: 250,
        p: 2,
        borderRight: "1px solid #ccc",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Filter &amp; Search
      </Typography>

      {/* Search box */}
      <TextField
        label="Search text"
        variant="outlined"
        size="small"
        fullWidth
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Categories (sorted externally) */}
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Categories
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {allCategories.map((cat) => (
          <FormControlLabel
            key={cat}
            label={`${cat} (${categoryCountMap[cat] || 0})`}
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
  )
}

FilterMenu.propTypes = {
  allCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  categoryCountMap: PropTypes.object.isRequired, // { [catName]: number }
  selectedCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChangeCategories: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
  onSearchChange: PropTypes.func,
}

export default FilterMenu