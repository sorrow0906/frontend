import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./StoreList.css";

function StoreList() {
  // ※후에 백엔드를 거치지 않고 최초에 전체 가게 리스트를 받아 프론트엔드 부분에서 정렬하도록 수정 필요!
  const [stores, setStores] = useState([]);
  const [sortStandard, setSortStandard] = useState("pick");
  const [selectedScates, setSelectedScates] = useState([]);

  useEffect(() => {
    loadStores();
  }, [sortStandard, selectedScates]);

  const loadStores = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/stores-main",
        {
          params: { sortBy: sortStandard,
            scates: selectedScates.join(",")
           },
        }
      );
      console.log("API Response Data:", response.data); // 데이터 구조 확인
      setStores(
        Array.isArray(response.data)
          ? response.data
          : response.data.stores || []
      );
    } catch (error) {
      console.error("Error loading stores:", error);
    }
  };

  const getImageSrc = (category) => {
    const categoryMap = {
      한식: "korean_food.png",
      일식: "japanese_food.png",
      중식: "chinese_food.png",
      양식: "western_food.png",
      세계요리: "global_food.png",
      "빵/디저트": "bread_dessert.png",
      "차/커피": "tea_coffee.png",
      술집: "pub.png",
    };
    return `images/icons/${categoryMap[category] || "other.png"}`;
  };

  const switchScates = (scate) =>{
    setSelectedScates((beforeScates) => 
      beforeScates.includes(scate) ? beforeScates.filter((s) => s !== scate) : [...beforeScates, scate]
    );
  };

  return (
    <div className="content">
      <h1>맛집 찾기 리스트</h1>

      {/* 선택 태그에 따른 가게 리스트 정렬 */}
      <div className="scate-area">
        {[
          "한식",
          "일식",
          "중식",
          "양식",
          "세계요리",
          "빵/디저트",
          "차/커피",
          "술집",
        ].map((scate) => (
          <div
            key={scate}
            className={`each-scate-area ${
              selectedScates.includes(scate) ? "select" : ""
            }`}
            onClick={() => switchScates(scate)}
          >
            <img
              src={getImageSrc(scate)}
              alt={scate}
              className="store-cate-button"
            />
            <p>{scate}</p>
          </div>
        ))}
      </div>

      {/* 순위기준에 따른 가게 리스트 정렬 */}
      <div className="sort-area">
        <a
          className={`sort-element ${
            sortStandard === "pick" ? "active" : ""}`}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setSortStandard("pick");
          }}
        >찜 많은 순</a>
        <p className="sort-element">|</p>
        <a
          className={`sort-element ${
            sortStandard === "score" ? "active" : ""}`}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setSortStandard("score");
          }}
        >별점 높은 순</a>
      </div>
      <table className="store-table">
        <thead>
          <tr>
            <th>순위</th>
            <th>가게명</th>
            <th>음식점 종류</th>
            <th>주소</th>
            <th>영업시간</th>
            <th>주차장</th>
            <th>{sortStandard === "score" ? "별점" : "찜"}</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store, index) => (
            <tr key={store.sno}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/store/${store.sno}`}>{store.sname}</Link>
              </td>
              <td>
                <img src={getImageSrc(store.scate)} alt={store.scate} />
              </td>
              <td>{store.saddr}</td>
              <td>{store.stime}</td>
              <td>
                {store.spark.includes("없음") ||
                store.spark.includes("불가") ? (
                  <img src={"images/icons/non_parking.png"} />
                ) : (
                  <img src={"images/icons/parking.png"} />
                )}
              </td>
              <td>
                {sortStandard === "score"
                  ? `${store.scoreArg.toFixed(1)}점`
                  : `${store.pickNum} 찜`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StoreList;
