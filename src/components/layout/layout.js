import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import Section3 from "../landing/cards";
import ScrollToTop from "../../pages/scrolltop";

function Layout({ children }) {
  return (
    <div>
      <ScrollToTop/>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
