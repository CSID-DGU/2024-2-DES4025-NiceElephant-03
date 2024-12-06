/*global kakao*/
import React, { useEffect } from "react";
import "./Kakaomap.css";

const Map = ({ specificLocations, selectedLocation }) => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.556, 126.9723), // 초기 중심 좌표
      level: 8, // 초기 확대 레벨
    };

    const map = new kakao.maps.Map(container, options);

    // 모든 마커 추가
    specificLocations.forEach((location) => {
      const markerPosition = new kakao.maps.LatLng(
        location.latitude,
        location.longitude
      );

      const markerImageSrc =
        "https://img.icons8.com/color/48/000000/marker.png"; // 마커 이미지 URL
      const markerImageSize = new kakao.maps.Size(32, 32);
      const markerImageOptions = { offset: new kakao.maps.Point(16, 32) };

      const markerImage = new kakao.maps.MarkerImage(
        markerImageSrc,
        markerImageSize,
        markerImageOptions
      );

      const marker = new kakao.maps.Marker({
        position: markerPosition,
        map: map,
        image: markerImage,
      });

      const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;">${location.name}</div>`,
      });

      kakao.maps.event.addListener(marker, "click", () => {
        infowindow.open(map, marker);
      });
    });

    // 선택된 위치로 지도 중심 이동 및 확대
    if (selectedLocation) {
      const newCenter = new kakao.maps.LatLng(
        selectedLocation.latitude,
        selectedLocation.longitude
      );
      map.setCenter(newCenter); // 중심 이동
      map.setLevel(1); // 확대 레벨
    }
  }, [specificLocations, selectedLocation]); // selectedLocation 변경 시 실행

  return <div id="map" className="map-container"></div>;
};

export default Map;
