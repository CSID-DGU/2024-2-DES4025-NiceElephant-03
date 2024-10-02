// src/App.js
import React, { useState, useEffect } from 'react';
import Map from './components/Kakaomap/Kakaomap';
import MapFilters from './components/MapFilters/MapFilters';
import './App.css';
import { ReactComponent as Logo } from './components/images/logo.svg';

const App = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedDong, setSelectedDong] = useState('');
  const [locations, setLocations] = useState([]);

  // 서버에서 위치 데이터를 가져오기
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(''); // API 엔드포인트
        const data = await response.json();
        setLocations(data.locations); // 서버로부터 받아온 데이터 형식에 따라 수정!!
      } catch (error) {
        console.error('Failed to fetch locations', error);
      }
    };

    fetchLocations();
  }, []); 

  return (
    <div className="app">
      <header className="app-header">
        <Logo/> 
        <MapFilters
        onCityChange={(value) => setSelectedCity(value)}
        onDistrictChange={(value) => setSelectedDistrict(value)}
        onDongChange={(value) => setSelectedDong(value)}
      />
      </header>
     
      <Map
        city={selectedCity}
        district={selectedDistrict}
        dong={selectedDong}
        locations={locations} // 서버에서 가져온 위치 데이터를 전달
      />
    </div>
  );
};

export default App;
