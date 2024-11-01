import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Header 관련 CSS 파일 import

function Header() {
  return (
    <header>
      <div className="header-div">
        <div className="hello1"></div>
        <Link className="header1" to="/">FOOD</Link>
        <Link className="header2" to="/">ing</Link>
        <Link className="header2" to="/">
          <img src="images/chefudding.png" width="100" height="100" alt="Logo" />
        </Link>
        <div className="hello2">
          <table border="0" align="center">
            <tbody>
              <tr>
                <td align="center">어서오세요!</td>
              </tr>
              <tr>
                <td align="center">
                  <span>
                    <Link className="helloBox"> 회원가입 </Link>
                  </span>
                  <span>|</span>
                  <span>
                    <Link className="helloBox" to="/login"> 로그인 </Link>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </header>
  );
}

export default Header;
