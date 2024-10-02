// src/components/MapFilters.js
import React from 'react';
import './MapFilters.css';

const MapFilters = ({ onCityChange, onDistrictChange, onDongChange }) => {
  return (
    <div className="map-filters">
      <select
        className="filter-dropdown"
        onChange={(e) => onCityChange(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled hidden>
          시를 선택해주세요
        </option>
        {/* 시 옵션 추가 */}
        <option value="Seoul">서울특별시</option>
        <option value="Busan">부산광역시</option>
        {/* 다른 시 추가 */}
      </select>

      <select
        className="filter-dropdown"
        onChange={(e) => onDistrictChange(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled hidden>
          구를 선택해주세요
        </option>
        {/* 구 옵션 추가 */}
        <option value="Jongno">종로구</option>
        <option value="Gangnam">강남구</option>
        {/* 다른 구 추가 */}
      </select>

      <select
        className="filter-dropdown"
        onChange={(e) => onDongChange(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled hidden>
          동을 선택해주세요
        </option>
        {/* 동 옵션 추가 */}
        <option value="Myeongdong">명동</option>
        <option value="Apgujeong">압구정동</option>
        {/* 다른 동 추가 */}
      </select>
    </div>
  );
};

export default MapFilters;
