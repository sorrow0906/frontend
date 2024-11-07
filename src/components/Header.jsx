import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header({ loggedIn }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (loggedIn) {
      fetch("/api/session-user")
        .then((response) => response.json())
        .then((data) => {
          if (data.loggedIn) {
            setUser(data.user);
          }
        })
        .catch((error) => console.error("Error fetching session user:", error));
    }
  }, [loggedIn]);

  return (
    <header>
      <div className="header-div">
        <div className="hello1"></div>
        <Link className="header1" to="/">
          FOOD
        </Link>
        <Link className="header2" to="/">
          ing
        </Link>
        <div className="hello2">
          <table border="0">
            {user ? (
              <>
                <tr>
                  <td align="center">
                    <img
                      className="login-image"
                      src={user.mimage || "/images/default-profile.png"}
                      alt="Profile"
                      style={{ maxWidth: "150px", maxHeight: "150px" }}
                    />
                    <p>{user.mname}님, 안녕하세요!</p>
                  </td>
                  </tr>
                  <tr>
                  <td align="center">
                    <Link className="helloBox" to="/myPage">
                      마이페이지
                    </Link>{" "}
                    |{" "}
                    <a className="helloBox" href="/logout">
                      로그아웃
                    </a>
                  </td>
                </tr>
              </>
            ) : (
              <>
                <tr>
                  <td align="center">
                    <p>어서오세요!</p>
                  </td>
                  </tr>
                  <tr>
                  <td align="center">
                    <Link className="helloBox" to="/registerSelect">
                      회원가입
                    </Link>{" "}
                    |{" "}
                    <Link className="helloBox" to="/login">
                      로그인
                    </Link>
                  </td>
                </tr>
              </>
            )}
          </table>
        </div>
      </div>
    </header>
  );
}

export default Header;
