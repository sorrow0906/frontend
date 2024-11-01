import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./StoreList.css";

function StoreList() {
  const [stores, setStores] = useState([]);
  const [sortStandard, setSortStandard] = useState("pick");

  useEffect(() => {
    loadStores();
  }, [sortStandard]);

  const loadStores = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/stores-test",
        {
          params: { sortBy: sortStandard },
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

  return (
    <div className="content">
      <h1>가게 목록</h1>
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
              <td>{store.spark.includes("없음") || store.spark.includes("불가") ? (<img src={"images/icons/non_parking.png"} />) : (<img src={"images/icons/parking.png"} />)}</td>
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
