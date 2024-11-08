import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Tabs, Tab } from '@mui/material';
import { Box } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import "./StoreDetail.css";
import StoreInfo from "./StoreInfo";
import Review from "./Review";

function StoreDetail() {
    const { sno } = useParams();
    // const navigate = useNavigate();
    const [store, setStore] = useState(null);
    const [storeTags, setStoreTags] = useState([]);
    const [rCount, setRCount] = useState(0);
    const [menus, setMenus] = useState([]);
    const [isPicked, setIsPicked] = useState(false);

    const [value, setValue] = useState("1"); // 초기 탭을 "1"로 설정

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
  
    useEffect(() => {


      // 가게 세부 정보를 불러오는 함수
      const fetchStoreDetail = async () => {
        try {
          const response = await axios.get(`/api/store-detail?sno=${sno}`);
          setStore(response.data.store);
          setStoreTags(response.data.storeTags);
          setRCount(response.data.rCount);
          setMenus(response.data.menus);
        } catch (error) {
          console.error("Error fetching store details:", error);
        }
      };
      fetchStoreDetail();
    }, [sno]);


    const getImageSrc = (scate, sno) => {
        const storeImage = {
            한식: "korean_food.jpg",
            일식: "japanese_food.jpg",
            중식: "chinese_food.jpg",
            양식: "western_food.jpg",
            세계요리: "global_food.jpg",
            "빵/디저트": "dessert.jpg",
            "차/커피": "coffee.jpg",
            술집: "pub.jpg",
        };
        return sno === 1 || sno === 19 || sno === 82 || sno === 181
        ? `/images/store_images/${sno}.jpg`
        : `/images/store_images/${storeImage[scate] || "other_food.jpg"}`;
    };

    return (
      <div className="store-detail">
        {store ? (
          <>
            <div className="store-div">
              <img
                id="store-img"
                src={getImageSrc(store.scate, store.sno)}
                alt={store.scate || "기타음식"}
              />

              <div className="store-head">
                <div className="head-elements">
                  <div className="s-first-area">
                    <a className="star-area" >
                      <img
                        className="pickStar"
                        src={"/images/store_images/bookmark_icon.png"}
                        alt="Star"
                      />
                    </a>
                    <div className="title-area">
                      <p id="store-title">{store.sname}</p>
                      {store.scoreArg ? (
                        <>
                          <img
                            id="score-img"
                            src="/images/store_images/score_icon.png"
                            alt="Score Icon"
                          />
                          <p id="store-score">{store.scoreArg.toFixed(1)}점</p>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className="pickNum-area">
                    <img
                      src="/images/store_images/pickNum_icon2.png"
                      alt="Pick Num"
                    />
                    <p>{store.pickNum}찜</p>
                  </div>
                </div>
                <div className="stag-area">
                  {storeTags.map(
                    (tag) =>
                      tag.tagCount > rCount * 0.3 && (
                        <button key={tag.tag.tno} className="main-tag-button">
                          {tag.tag.ttag}
                        </button>
                      )
                  )}
                </div>
                <p id="store-explain">{store.seg}</p>
              </div>
            </div>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  sx={{
                    "& .MuiTabs-scroller": {
                      display: "ruby",
                    },
                  }}
                >
                  <Tab label="가게 정보" value="1" />
                  <Tab label="리뷰" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1"><StoreInfo address={store.saddr} store={store} menus={menus} /></TabPanel>
              <TabPanel value="2">{store.sno && <Review sno={store.sno}/>}</TabPanel>
            </TabContext>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );

}

export default StoreDetail;