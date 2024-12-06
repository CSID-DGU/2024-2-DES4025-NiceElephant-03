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

      // 마커 클릭 이벤트
      kakao.maps.event.addListener(marker, "click", () => {
        // 좌표를 주소로 변환
        geocoder.coord2Address(
          location.longitude,
          location.latitude,
          (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              const address =
                result[0]?.address?.address_name || "주소 정보 없음";

              // InfoWindow 내용 구성
              const content = `
                <div class="info-window-content">
                  <strong>${location.name}</strong><br/>
                  ${address}
                </div>`;

              const infowindow = new kakao.maps.InfoWindow({
                content: content,
                removable: true,
              });

              // InfoWindow를 맵에 표시
              infowindow.open(map, marker);

              // InfoWindow 표시 후 글자 크기 조정
              const infoWindowContent = document.querySelector(
                ".info-window-content"
              );

              // InfoWindow의 콘텐츠가 로드된 후 크기 조정
              const adjustFontSize = () => {
                if (infoWindowContent) {
                  let fontSize = 16; // 기본 글씨 크기
                  const maxWidth = 200; // 최대 너비 제한
                  const contentWidth = infoWindowContent.offsetWidth;

                  // 텍스트 길이에 비례하여 글자 크기 조정
                  if (contentWidth > maxWidth) {
                    fontSize = (maxWidth / contentWidth) * fontSize; // 너비에 비례한 크기 조정
                  }

                  infoWindowContent.style.fontSize = `${fontSize}px`;
                }
              };

              adjustFontSize(); // 글씨 크기 조정 함수 호출
            } else {
              console.error("Geocoder 실패: ", status);
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
      map.setLevel(5); // 확대 레벨
    }
  }, [specificLocations, selectedLocation]); // selectedLocation 변경 시 실행

  return <div id="map" className="map-container"></div>;
};

export default Map;
