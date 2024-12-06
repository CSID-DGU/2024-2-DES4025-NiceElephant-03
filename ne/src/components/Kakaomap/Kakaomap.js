/*global kakao*/
import React, { useEffect } from "react";
import "./Kakaomap.css";

const Map = ({ specificLocations, selectedLocation }) => {
  const adjustFontSize = (infowindowContent, infowindow) => {
    const containerWidth = infowindowContent.offsetWidth;
    let fontSize = 12; // 기본 글씨 크기

    // 글씨 크기를 자동으로 조정
    if (containerWidth < 300) {
      fontSize = 14;
    } else {
      fontSize = 16;
    }

    infowindowContent.style.fontSize = `${fontSize}px`;
  };

  useEffect(() => {
    // Kakao 지도 API가 로드된 후 실행
    if (window.kakao) {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(37.556, 126.9723), // 초기 중심 좌표
          level: 8, // 초기 확대 레벨
        };

        const map = new kakao.maps.Map(container, options);
        const geocoder = new kakao.maps.services.Geocoder();

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

          // 마커 클릭 시 주소 검색 및 InfoWindow 띄우기
          kakao.maps.event.addListener(marker, "click", () => {
            // geocoder를 이용해 주소를 찾기
            geocoder.coord2Address(
              location.longitude, // 경도
              location.latitude, // 위도
              (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                  const address =
                    result[0]?.address?.address_name || "주소 정보 없음";

                  // InfoWindow 콘텐츠 생성 (HTML 요소로 만들기)
                  const infowindowContent = document.createElement("div");
                  infowindowContent.style.padding = "5px";
                  infowindowContent.innerHTML = `<strong>${location.name}</strong><br>${address}`;

                  // InfoWindow로 주소 표시
                  const infowindow = new kakao.maps.InfoWindow({
                    content: infowindowContent,
                    removable: true,
                  });

                  infowindow.open(map, marker); // 주소를 포함한 정보창 열기

                  // 글씨 크기 자동 조정
                  adjustFontSize(infowindowContent, infowindow);
                }
              }
            );
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
      });
    } else {
      console.error("카카오 지도 API가 로드되지 않았습니다.");
    }
  }, [specificLocations, selectedLocation]); // specificLocations 또는 selectedLocation 변경 시 실행

  return <div id="map" className="map-container"></div>;
};

export default Map;
