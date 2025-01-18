import React, { useContext } from "react"
import PropTypes from "prop-types"
import { Switch } from "@mui/material"
import { ThemeContext } from "../utils/theme" // hypothetical context

function DarkModeToggle({ checked, onToggle }) {
  return (
    <Switch
      checked={checked}
      onChange={onToggle}
      color="default"
      inputProps={{ "aria-label": "dark mode toggle" }}
    />
  )
}

DarkModeToggle.propTypes = {
  checked: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
}

export default DarkModeToggle
