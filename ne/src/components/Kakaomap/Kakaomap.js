/*global kakao*/ 
import React, { useEffect } from 'react';
import './Kakaomap.css';

const { kakao } = window;

const Map = ({ city, district, dong, locations }) => {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.5665, 126.9780), // 기본 위치 설정 (서울)
      level: 5,
    };

    const map = new kakao.maps.Map(container, options);

    // 서버에서 받아온 위치 데이터를 사용해 마커 추가
    if (locations && locations.length > 0) {
      locations.forEach((location) => {
        const markerPosition = new kakao.maps.LatLng(location.latitude, location.longitude);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    }

  }, [locations, city, district, dong]); // locations가 업데이트될 때마다 지도를 갱신

  return <div id="map" className="map-container"></div>;
};

export default Map;
