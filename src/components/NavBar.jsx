import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; // 스타일 파일 가져오기

function NavBar({ contextPath = "" }) {

  const [isSnbVisible, setIsSnbVisible] = useState(false);


  return (
    <nav>
      <div className="nav-div"
        onMouseEnter={() => setIsSnbVisible(true)} 
        onMouseLeave={() => setIsSnbVisible(false)}>
        <Link className="nav" to={`/`}>카테고리별 맛집</Link>
        <Link className="nav" >맛집 찾기</Link>
        <Link className="nav" >모임</Link>
        <Link className="nav" >찜</Link>
        
        <form action={`${contextPath}/searchResultView`} method="GET" className="d-flex">
          <div className="search-form">
            <input
              className="form-control me-2"
              name="searchKeyword"
              type="search"
              placeholder="가게를 검색하세욧"
              aria-label="Search"
            />
            <button type="submit" className="btn btn-link">
              <img src={`/images/search.png`} alt="Search" />
            </button>
          </div>
        </form>
        <ul
          className="snb"
          style={{ display: isSnbVisible ? "flex" : "none" }}
          onMouseEnter={() => setIsSnbVisible(true)}
          onMouseLeave={() => setIsSnbVisible(false)}
        >
          <div className="submenu">
            <li><Link >한식</Link></li>
            <li><Link >일식</Link></li>
            <li><Link >중식</Link></li>
            <li><Link >양식</Link></li>
            <li><Link >세계요리</Link></li>
            <li><Link >빵/디저트</Link></li>
            <li><Link >차/커피</Link></li>
            <li><Link >술집</Link></li>
          </div>
          <div className="submenu">
            <li><Link >위치별</Link></li>
            <li><Link >순위별</Link></li>
            <li><Link >태그별</Link></li>
          </div>
          <div className="submenu">
            <li><Link >내 모임</Link></li>
            <li><Link >모임 관리</Link></li>
            <li><Link >내 초대 관리</Link></li>
          </div>
          <div className="submenu">
            <li><Link >찜 폴더 관리</Link></li>
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
