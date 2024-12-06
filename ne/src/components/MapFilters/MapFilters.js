import React, { useEffect, useState } from "react";
import "./MapFilters.css";

const MapFilters = ({
  onCityChange,
  onDistrictChange,
  onDongChange,
  selectedCity,
  selectedDistrict,
  selectedDong,
}) => {
  const [districts, setDistricts] = useState([]);
  const [dongs, setDongs] = useState([]);

  // 구에 해당하는 동 목록을 미리 정의
  const districtToDongs = {
    노원구: ["월계동", "공릉동", "하계동", "중계동"],
    강서구: ["방화동", "등촌동", "염창동", "화곡동"],
    강남구: ["수서동", "삼성동", "압구정동", "청담동"],
    성동구: ["응봉동", "왕십리동", "마장동", "성수동"],
    용산구: ["효창동", "이촌동", "한남동", "명동"],
    영등포구: ["여의도동", "당산동", "영등포동", "대림동"],
  };

  // 구를 선택할 때마다 해당 구에 맞는 동을 자동으로 설정
  useEffect(() => {
    const availableDistricts = [
      "노원구",
      "강서구",
      "강남구",
      "성동구",
      "용산구",
      "영등포구",
    ];
    setDistricts(availableDistricts);

    if (selectedDistrict) {
      // 구에 맞는 동 목록을 자동으로 설정
      const availableDongs = districtToDongs[selectedDistrict] || [];
      setDongs(availableDongs);
    }
  }, [selectedDistrict]); // selectedDistrict가 변경될 때마다 실행

  return (
    <div className="map-filters">
      <select
        className="filter-dropdown"
        onChange={(e) => onCityChange(e.target.value)}
        value={selectedCity}
        disabled
      >
        <option value="Seoul">서울특별시</option>
      </select>

      <select
        className="filter-dropdown"
        onChange={(e) => onDistrictChange(e.target.value)}
        value={selectedDistrict}
      >
        <option value="" disabled hidden>
          구를 선택해주세요
        </option>
        {districts.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>

      <select
        className="filter-dropdown"
        onChange={(e) => onDongChange(e.target.value)}
        value={selectedDong}
      >
        <option value="" disabled hidden>
          동을 선택해주세요
        </option>
        {dongs.map((dong) => (
          <option key={dong} value={dong}>
            {dong}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MapFilters;
