import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import "./NavBar.css"; // 스타일 파일 가져오기

function NavBar({ contextPath = "" }) {

  const [isSnbVisible, setIsSnbVisible] = useState(false);
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '80%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '80%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));


  return (
    <nav>
      <div className="nav-div"
        onMouseEnter={() => setIsSnbVisible(true)} 
        onMouseLeave={() => setIsSnbVisible(false)}>
        <Link className="nav" to={`/`}>카테고리별 맛집</Link>
        <Link className="nav" >맛집 찾기</Link>
        <Link className="nav" >모임</Link>
        <Link className="nav" >찜</Link>
        
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
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
