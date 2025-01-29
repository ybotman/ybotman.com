import React from "react"
import PropTypes from "prop-types"
import Header from '@/components/Header';
import Footer from "@/components/Footer";

function Layout({ children }) {
  return (
    <>
      <Header siteTitle="YbotMan Blog" />
      <main>{children}</main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
