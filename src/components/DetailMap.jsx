// DetailMap.js
import React, { useEffect, useRef } from "react";

const DetailMap = ({ address }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const initializeMap = () => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      
      geocoder.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          
          const map = new window.kakao.maps.Map(mapContainer.current, {
            center: coords,
            level: 3,
          });
          
          new window.kakao.maps.Marker({
            map,
            position: coords,
          });
        }
      });
    };

    const kakaoScriptLoad = () => {
      if (window.kakao && window.kakao.maps) {
        initializeMap();
      } else {
        const script = document.createElement("script");
        script.src = "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1720be0e84bb5634111a38d60aad47c1&libraries=services";
        script.onload = () => {
          window.kakao.maps.load(() => {
            initializeMap();
          });
        };
        document.head.appendChild(script);
      }
    };

    kakaoScriptLoad();
  }, [address]);

  return <div ref={mapContainer} style={{ width: "60%", height: "520px" }} />;
};

export default DetailMap;
