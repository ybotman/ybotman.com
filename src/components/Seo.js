import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"

function Seo({ title, description }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  )
}

Seo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
}

Seo.defaultProps = {
  description: "",
}

export default Seo
