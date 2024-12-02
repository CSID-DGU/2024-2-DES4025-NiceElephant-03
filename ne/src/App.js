import React, { useState } from 'react';
import MapFilters from './components/MapFilters/MapFilters';
import './App.css';
import { ReactComponent as Logo } from './components/images/logo.svg';

const App = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedDong, setSelectedDong] = useState('');

  // 하드코딩된 위치 데이터
  const locations = [
    { id: 1, name: 'Location A', latitude: 37.5665, longitude: 126.9780 },
    { id: 2, name: 'Location B', latitude: 37.5796, longitude: 126.9769 },
    { id: 3, name: 'Location C', latitude: 37.5610, longitude: 126.9820 },
  ];

  return (
    <div className="app">
      <header className="app-header">
        <Logo />
        <MapFilters
          onCityChange={(value) => setSelectedCity(value)}
          onDistrictChange={(value) => setSelectedDistrict(value)}
          onDongChange={(value) => setSelectedDong(value)}
        />
      </header>

    
    </div>
  );
};

export default App;
