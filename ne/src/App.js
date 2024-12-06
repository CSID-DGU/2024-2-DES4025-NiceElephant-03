import React, { useState, useEffect } from "react";
import Map from "./components/Kakaomap/Kakaomap";
import MapFilters from "./components/MapFilters/MapFilters";
import "./App.css";
import { specificLocations } from "./utils/locations"; // 좌표 데이터
import { ReactComponent as Logo } from "./components/images/logo.svg";

const App = () => {
  const [selectedCity, setSelectedCity] = useState(""); // 시
  const [selectedDistrict, setSelectedDistrict] = useState(""); // 구
  const [selectedDong, setSelectedDong] = useState(""); // 동
  const [selectedLocation, setSelectedLocation] = useState(null); // 선택된 위치

  // 구가 변경될 때마다 자동으로 시와 동을 설정
  useEffect(() => {
    if (selectedDistrict) {
      // 구에 맞는 시 자동 선택 (서울이면 서울로 설정)
      const city = "Seoul"; // 모든 구가 서울에 속한다고 가정
      setSelectedCity(city);

      // 동은 구에 맞는 첫 번째 동으로 설정 (동 정보가 없으므로 구 이름만 설정)
      const location = specificLocations.find(
        (loc) => loc.district === selectedDistrict
      );
      if (location) {
        setSelectedDong(location.district); // 동 정보가 있으면 추가할 수 있음
      } else {
        setSelectedDong(""); // 구에 해당하는 동이 없을 경우
      }

      // 해당 구에 맞는 첫 번째 좌표로 위치 설정
      const loc = specificLocations.find(
        (loc) => loc.district === selectedDistrict
      );
      if (loc) {
        setSelectedLocation({
          latitude: loc.latitude,
          longitude: loc.longitude,
        });
      } else {
        setSelectedLocation(null); // 선택된 구가 없을 경우
      }
    }
  }, [selectedDistrict]); // 구가 변경될 때마다 실행

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
  };

  return (
    <div className="app">
      <header className="app-header">
        <Logo />
        <MapFilters
          onCityChange={setSelectedCity}
          onDistrictChange={handleDistrictChange}
          onDongChange={setSelectedDong}
          selectedCity={selectedCity}
          selectedDistrict={selectedDistrict}
          selectedDong={selectedDong}
        />
      </header>
      <Map
        specificLocations={specificLocations}
        selectedLocation={selectedLocation}
      />
    </div>
  );
};

export default App;
