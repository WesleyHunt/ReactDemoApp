import React from 'react';
import logo from './logo.svg';
import './App.css';
import OwnershipSliderCalculator from './components/OwnerShipSliderCalculator/OwnershipSliderCalculator'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <OwnershipSliderCalculator rent={2400} initialMin={1200} initialMax={4000} monthlyMax={800} yearsMax={5} />
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
