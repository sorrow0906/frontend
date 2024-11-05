import React, { useEffect } from "react";
import StoreMap from "./StoreMap";

const StoreInfo = ({ address, store, menus }) => {
    useEffect(() => {
  }, [address, store, menus]);

  return (
    <div className="store-info-map">
      <div className="store-info">
        <h2 className="menu-title">메뉴</h2>
        <table className="menu-table">
          <thead>
            <tr>
              <td>메뉴이름</td>
              <td>가격</td>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu, index) => (
              <tr key={index}>
                <td>{menu.mnname}</td>
                <td>{menu.mnprice}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>영업시간</h2>
        <p>{store.stime}</p>
        <h2>주차</h2>
        <p>{store.spark}</p>
        <h2>전화번호</h2>
        <p>{store.stel}</p>
      </div>
      <div id="map-container">
      <p id="store-address">{address}</p>
      <StoreMap address={address}/>
      </div>
    </div>
  );
};

export default StoreInfo;
