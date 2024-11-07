import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import NavBar from "./NavBar";

function Layout({ children, loggedIn, onLogout }) {
  return (
    <div>
      <Header loggedIn={loggedIn} onLogout={onLogout}/>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
