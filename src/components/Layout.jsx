import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import NavBar from "./NavBar";

function Layout({ children }) {
  return (
    <div>
      <Header />
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
