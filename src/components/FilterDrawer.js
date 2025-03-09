import React from "react"
import PropTypes from "prop-types"
import {
  Box,
  IconButton,
  Drawer,
} from "@mui/material"
// Choose any right-arrow icon you like:
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

import FilterMenu from "./FilterMenu"

function FilterDrawer({
  allCategories,
  categoryCountMap,
  selectedCategories,
  onChangeCategories,
  searchQuery,
  onSearchChange,
}) {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = () => {
    setOpen((prev) => !prev)
  }

  return (
    <Box sx={{ mb: 2 }}>
      {/* Icon + label to open the drawer */}
      <IconButton
        onClick={toggleDrawer}
        aria-label="Open filter drawer"
        // Apply a pulse animation
        sx={{
          animation: "pulse 1.6s infinite", 
          "@keyframes pulse": {
            "0%": { transform: "scale(1)" },
            "50%": { transform: "scale(1.1)" },
            "100%": { transform: "scale(1)" },
          },
        }}
      >
        <ChevronRightIcon />
        <Box component="span" sx={{ ml: 1 }}>
          Filter / Search
        </Box>
      </IconButton>

      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        {/* Drawer Content: FilterMenu */}
        <Box sx={{ width: 280 }}>
          <FilterMenu
            allCategories={allCategories}
            categoryCountMap={categoryCountMap}
            selectedCategories={selectedCategories}
            onChangeCategories={onChangeCategories}
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
          />
        </Box>
      </Drawer>
    </Box>
  )
}

FilterDrawer.propTypes = {
  allCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  categoryCountMap: PropTypes.object.isRequired,
  selectedCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChangeCategories: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
  onSearchChange: PropTypes.func,
}

export default FilterDrawer