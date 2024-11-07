import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import NavBar from "./NavBar";

function Layout({ children, loggedIn }) {
  return (
    <div>
      <Header loggedIn={loggedIn}/>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
