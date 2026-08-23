import React, { useState } from 'react';
import { regionalWeatherData } from '../data/weatherData';
import './Weather.css';

/**
 * Weather Page Component (Evaluation 1 Demo)
 * 
 * Demonstrates:
 * - useState: Managing selectedRegion to display corresponding static weather profiles
 * - Array.prototype.map(): Rendering dynamic 5-day forecast cards and agricultural advisories
 * - Component-based structured layout with current conditions, 5-day forecast, and farming insights
 */
function Weather() {
  // 1. useState: Default to Punjab, India as specified in requirements
  const [selectedRegionKey, setSelectedRegionKey] = useState('punjab');

  // Retrieve the static weather dataset for the chosen region
  const activeWeatherData = regionalWeatherData[selectedRegionKey] || regionalWeatherData.punjab;
  const { current, forecast5Day, farmingInsight, regionName, subDistrict, lastUpdated } = activeWeatherData;

  return (
    <div className="weather-page page-wrapper">
      <div className="container">
        {/* ===================================================================
            1. PAGE HEADER
            =================================================================== */}
        <header className="page-header weather-header text-center">
          <span className="badge page-badge">Agricultural Meteorology</span>
          <h1 className="page-title">Weather Intelligence</h1>
          <p className="page-description">
            Monitor weather conditions and plan farming activities more effectively.
          </p>
        </header>

        {/* ===================================================================
            2. LOCATION SELECTOR BAR (useState Demonstration)
            =================================================================== */}
        <div className="region-selector-bar card flex flex-between">
          <div className="region-info">
            <span className="region-icon" role="img" aria-label="Location pin">📍</span>
            <div>
              <strong className="region-active-name">{regionName}</strong>
              <span className="text-xs text-muted"> — {subDistrict} ({lastUpdated})</span>
            </div>
          </div>

          <div className="region-select-control">
            <label htmlFor="weather-region-select" className="region-label text-xs font-semibold">
              Select Region:
            </label>
            <select
              id="weather-region-select"
              className="form-select region-dropdown"
              value={selectedRegionKey}
              onChange={(e) => setSelectedRegionKey(e.target.value)}
            >
              <option value="punjab">Punjab (Ludhiana Belt)</option>
              <option value="haryana">Haryana (Karnal Zone)</option>
              <option value="maharashtra">Maharashtra (Nashik Zone)</option>
            </select>
          </div>
        </div>

        {/* ===================================================================
            3. CURRENT WEATHER HERO CARD
            =================================================================== */}
        <section className="card current-weather-card">
          <div className="current-weather-grid">
            {/* Left: Main Temp & Condition */}
            <div className="current-main-box">
              <span className="current-location-badge badge badge-success">
                Current Conditions • {regionName}
              </span>
              <div className="current-temp-flex">
                <span className="current-weather-icon" role="img" aria-label={current.condition}>
                  {current.icon}
                </span>
                <div>
                  <h2 className="current-temperature">{current.temperature}</h2>
                  <p className="current-condition-text">{current.condition}</p>
                </div>
              </div>
              <p className="current-range-text text-sm text-muted">
                High: <strong>{current.highTemp}</strong> • Low: <strong>{current.lowTemp}</strong> • Dew Point: {current.dewPoint}
              </p>
            </div>

            {/* Right: Key Meteorological Parameters (4 Core + 2 Extra) */}
            <div className="current-metrics-grid">
              {/* 1. Humidity */}
              <div className="metric-tile">
                <span className="metric-tile-icon">💧</span>
                <div>
                  <span className="metric-tile-label text-xs text-muted">Humidity</span>
                  <strong className="metric-tile-value">{current.humidity}</strong>
                </div>
              </div>

              {/* 2. Wind Speed */}
              <div className="metric-tile">
                <span className="metric-tile-icon">💨</span>
                <div>
                  <span className="metric-tile-label text-xs text-muted">Wind Speed</span>
                  <strong className="metric-tile-value">{current.windSpeed}</strong>
                </div>
              </div>

              {/* 3. Rain Chance */}
              <div className="metric-tile">
                <span className="metric-tile-icon">🌧️</span>
                <div>
                  <span className="metric-tile-label text-xs text-muted">Rain Chance</span>
                  <strong className="metric-tile-value">{current.rainChance}</strong>
                </div>
              </div>

              {/* 4. Feels Like */}
              <div className="metric-tile">
                <span className="metric-tile-icon">🌡️</span>
                <div>
                  <span className="metric-tile-label text-xs text-muted">Feels Like</span>
                  <strong className="metric-tile-value">{current.feelsLike}</strong>
                </div>
              </div>

              {/* 5. Soil Moisture */}
              <div className="metric-tile">
                <span className="metric-tile-icon">🪵</span>
                <div>
                  <span className="metric-tile-label text-xs text-muted">Soil Moisture</span>
                  <strong className="metric-tile-value">{current.soilMoisture}</strong>
                </div>
              </div>

              {/* 6. UV Index */}
              <div className="metric-tile">
                <span className="metric-tile-icon">☀️</span>
                <div>
                  <span className="metric-tile-label text-xs text-muted">UV Index</span>
                  <strong className="metric-tile-value">{current.uvIndex}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            4. 5-DAY AGRICULTURAL FORECAST (Mapped via Array.map)
            =================================================================== */}
        <section className="section forecast-section">
          <div className="section-header">
            <span className="badge page-badge">Outlook</span>
            <h2 className="section-title">5-Day Agricultural Forecast</h2>
            <p className="section-subtitle">
              Plan planting, chemical application, and irrigation according to five-day weather trajectories.
            </p>
          </div>

          <div className="forecast-cards-grid">
            {forecast5Day.map((day) => (
              <div key={day.id} className="card forecast-card">
                <span className="forecast-day-name">{day.day}</span>
                <span className="forecast-icon" role="img" aria-label={day.condition}>
                  {day.icon}
                </span>
                <span className="forecast-condition-label text-xs text-muted">{day.condition}</span>
                <div className="forecast-temp-box">
                  <strong className="forecast-high-temp">{day.high}</strong>
                  <span className="forecast-low-temp text-muted text-xs">/ {day.low}</span>
                </div>
                <div className="forecast-rain-prob">
                  <span className="rain-drop-icon">💧</span>
                  <span className="rain-prob-text text-xs">{day.rainChance} rain</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            5. FARMING INSIGHT & ADVISORY SECTION
            =================================================================== */}
        <section className="section farming-insight-section" style={{ paddingTop: 0 }}>
          <div className="card insight-main-card">
            {/* Insight Header */}
            <div className="insight-header">
              <span className="insight-icon" role="img" aria-label="Bulb">💡</span>
              <div>
                <h3 className="insight-title">Farming Insight</h3>
                <p className="insight-summary text-muted">
                  "{farmingInsight.summary}"
                </p>
              </div>
            </div>

            {/* Advisory Highlights Grid */}
            <div className="grid-2 advisories-grid">
              {farmingInsight.advisories.map((adv) => (
                <div key={adv.id} className="card advisory-subcard">
                  <div className="advisory-top flex flex-between">
                    <div className="flex gap-sm align-center">
                      <span className="advisory-icon">{adv.icon}</span>
                      <h4 className="advisory-category">{adv.category}</h4>
                    </div>
                    <span className="badge badge-success text-xs">{adv.status}</span>
                  </div>
                  <p className="advisory-desc text-muted text-sm">{adv.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Weather;
