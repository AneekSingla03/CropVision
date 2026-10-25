import React, { useState, useEffect } from 'react';
import { regionalWeatherData, REGION_COORDINATES, getWmoWeatherDetails } from '../data/weatherData';
import './Weather.css';

function Weather() {
  const [selectedRegionKey, setSelectedRegionKey] = useState('punjab');
  const [weatherData, setWeatherData] = useState(null);

  // Explicit async state: 'loading' | 'refreshing' | 'success' | 'error'
  const [asyncState, setAsyncState] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryTrigger, setRetryTrigger] = useState(0);

  const regionConfig = REGION_COORDINATES[selectedRegionKey] || REGION_COORDINATES.punjab;
  const activeStaticData = regionalWeatherData[selectedRegionKey] || regionalWeatherData.punjab;
  const { forecast5Day, farmingInsight } = activeStaticData;

  useEffect(() => {
    const controller = new AbortController();
    const coords = REGION_COORDINATES[selectedRegionKey] || REGION_COORDINATES.punjab;
    let isCancelled = false;

    async function fetchLiveWeather() {
      // Clear previous error messages
      setErrorMessage('');
      // Clear data to avoid presenting previous region data under the new region selection
      setWeatherData(null);

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`;

      try {
        const response = await fetch(url, { signal: controller.signal });

        // 1. Handle unsuccessful HTTP status codes
        if (!response.ok) {
          throw new Error(`Open-Meteo returned HTTP ${response.status} (${response.statusText || 'Service Error'}).`);
        }

        // 2. Parse and handle malformed JSON responses
        let data;
        try {
          data = await response.json();
        } catch {
          throw new Error('Received an unreadable or malformed response from the meteorological server.');
        }

        // 3. Handle empty payload or API-level error fields
        if (!data) {
          throw new Error('Received an empty response payload from Open-Meteo.');
        }

        if (data.error) {
          throw new Error(data.reason || 'Open-Meteo reported a query error for the requested coordinates.');
        }

        const current = data.current;
        if (!current || typeof current !== 'object') {
          throw new Error('Weather response is missing the current conditions object.');
        }

        // 4. Validate required meteorological values are valid numbers
        if (
          typeof current.temperature_2m !== 'number' ||
          typeof current.weather_code !== 'number' ||
          typeof current.relative_humidity_2m !== 'number' ||
          typeof current.wind_speed_10m !== 'number'
        ) {
          throw new Error('Meteorological response is missing required telemetry values (temperature, weather code, humidity, or wind).');
        }

        // Guard against race conditions: only update state if request is still current
        if (!isCancelled && !controller.signal.aborted) {
          setWeatherData(data);
          setAsyncState('success');
          setIsRetrying(false);
        }
      } catch (err) {
        // Intentionally cancelled due to rapid region change or component unmount: safely ignore
        if (err.name === 'AbortError' || isCancelled || controller.signal.aborted) {
          return;
        }

        setErrorMessage(
          err.message || 'Unable to connect to Open-Meteo weather service. Please verify your internet connection.'
        );
        setAsyncState('error');
        setIsRetrying(false);
      }
    }

    fetchLiveWeather();

    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, [selectedRegionKey, retryTrigger]);

  const handleRegionChange = (newKey) => {
    if (newKey === selectedRegionKey) return;
    setAsyncState('refreshing');
    setWeatherData(null);
    setSelectedRegionKey(newKey);
  };

  const handleRetry = () => {
    setIsRetrying(true);
    setAsyncState('loading');
    setRetryTrigger((prev) => prev + 1);
  };

  const currentLive = weatherData?.current;
  const units = weatherData?.current_units || {};
  const wmoDetails = currentLive ? getWmoWeatherDetails(currentLive.weather_code, currentLive.is_day) : null;

  return (
    <div className="weather-page page-wrapper">
      <div className="container">
        {/* Header */}
        <header className="page-header weather-header text-center">
          <span className="badge page-badge">Agricultural Meteorology</span>
          <h1 className="page-title">Weather Intelligence</h1>
          <p className="page-description">
            Real-time meteorological observation powered by Open-Meteo REST API combined with regional crop advisories.
          </p>
        </header>

        {/* Region Selector Bar */}
        <div className="region-selector-bar card flex flex-between">
          <div className="region-info">
            <span className="region-icon" role="img" aria-label="Location pin">📍</span>
            <div>
              <strong className="region-active-name">{regionConfig.regionName}</strong>
              <span className="text-xs text-muted">
                {' '}— {regionConfig.subDistrict} (Lat: {regionConfig.lat.toFixed(4)}°N, Lon: {regionConfig.lon.toFixed(4)}°E)
              </span>
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
              onChange={(e) => handleRegionChange(e.target.value)}
              aria-label="Select agricultural region"
            >
              <option value="punjab">Punjab (Ludhiana Belt)</option>
              <option value="haryana">Haryana (Karnal Zone)</option>
              <option value="maharashtra">Maharashtra (Nashik Zone)</option>
            </select>
          </div>
        </div>

        {/* Current Conditions Card */}
        <section className="card current-weather-card" aria-label="Current Weather Conditions">
          {/* 1. INITIAL LOADING STATE */}
          {asyncState === 'loading' && (
            <div className="weather-status-card loading-state" role="status" aria-live="polite">
              <div className="weather-spinner" aria-hidden="true" />
              <h3 className="weather-status-title">Fetching Live Weather Intelligence...</h3>
              <p className="text-muted text-sm">
                Querying Open-Meteo telemetry for {regionConfig.regionName} ({regionConfig.lat.toFixed(2)}°N, {regionConfig.lon.toFixed(2)}°E)...
              </p>
            </div>
          )}

          {/* 2. REFRESHING STATE (Region Switch) */}
          {asyncState === 'refreshing' && (
            <div className="weather-status-card refreshing-state" role="status" aria-live="polite">
              <div className="weather-spinner" aria-hidden="true" />
              <h3 className="weather-status-title">Refreshing Regional Telemetry...</h3>
              <p className="text-muted text-sm">
                Updating real-time satellite data for {regionConfig.regionName}. Previous region cache cleared.
              </p>
            </div>
          )}

          {/* 3. ERROR & RETRY STATE */}
          {asyncState === 'error' && (
            <div className="weather-status-card error-state" role="alert">
              <span className="weather-error-icon" aria-hidden="true">⚠️</span>
              <h3 className="weather-status-title">Unable to Load Live Weather</h3>
              <p className="weather-error-message text-sm">{errorMessage}</p>
              <p className="weather-fallback-warning">
                Live data only: Synthetic values are omitted during connection issues to protect field decision accuracy.
              </p>
              <button
                type="button"
                className="btn btn-secondary weather-retry-btn"
                onClick={handleRetry}
                disabled={isRetrying}
                aria-label={`Retry fetching weather data for ${regionConfig.regionName}`}
              >
                {isRetrying ? '🔄 Connecting...' : '🔄 Retry Connection'}
              </button>
            </div>
          )}

          {/* 4. SUCCESS STATE */}
          {asyncState === 'success' && currentLive && wmoDetails && (
            <div className="current-weather-grid">
              <div className="current-main-box">
                <div className="flex align-center gap-xs current-badges-wrap" style={{ marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <span className="badge badge-success">
                    {regionConfig.regionName}
                  </span>
                  <span className="badge live-api-badge">
                    <span className="live-pulse-dot" aria-hidden="true" /> Live Open-Meteo API
                  </span>
                </div>

                <div className="current-temp-flex">
                  <span className="current-weather-icon" role="img" aria-label={wmoDetails.condition}>
                    {wmoDetails.icon}
                  </span>
                  <div>
                    <h2 className="current-temperature">
                      {Math.round(currentLive.temperature_2m)}{units.temperature_2m || '°C'}
                    </h2>
                    <p className="current-condition-text">{wmoDetails.condition}</p>
                  </div>
                </div>

                <p className="current-range-text text-sm text-muted">
                  Feels like: <strong>{currentLive.apparent_temperature}{units.apparent_temperature || '°C'}</strong> • 
                  Coordinates: {regionConfig.lat.toFixed(2)}°N, {regionConfig.lon.toFixed(2)}°E • 
                  Zone: {weatherData.timezone || 'Auto'}
                </p>
                <span className="text-xs text-muted" style={{ marginTop: '0.4rem', display: 'block' }}>
                  Observation timestamp: {currentLive.time ? currentLive.time.replace('T', ' ') : 'Live'} ({weatherData.timezone_abbreviation || 'Local Station'})
                </span>
              </div>

              <div className="current-metrics-grid">
                <div className="metric-tile">
                  <span className="metric-tile-icon" aria-hidden="true">💧</span>
                  <div>
                    <span className="metric-tile-label text-xs text-muted">Humidity</span>
                    <strong className="metric-tile-value">
                      {currentLive.relative_humidity_2m}{units.relative_humidity_2m || '%'}
                    </strong>
                  </div>
                </div>

                <div className="metric-tile">
                  <span className="metric-tile-icon" aria-hidden="true">💨</span>
                  <div>
                    <span className="metric-tile-label text-xs text-muted">Wind Speed</span>
                    <strong className="metric-tile-value">
                      {currentLive.wind_speed_10m} {units.wind_speed_10m || 'km/h'}
                    </strong>
                  </div>
                </div>

                <div className="metric-tile">
                  <span className="metric-tile-icon" aria-hidden="true">🌧️</span>
                  <div>
                    <span className="metric-tile-label text-xs text-muted">Precipitation</span>
                    <strong className="metric-tile-value">
                      {currentLive.precipitation} {units.precipitation || 'mm'}
                    </strong>
                  </div>
                </div>

                <div className="metric-tile">
                  <span className="metric-tile-icon" aria-hidden="true">🌡️</span>
                  <div>
                    <span className="metric-tile-label text-xs text-muted">Feels Like</span>
                    <strong className="metric-tile-value">
                      {currentLive.apparent_temperature}{units.apparent_temperature || '°C'}
                    </strong>
                  </div>
                </div>

                <div className="metric-tile">
                  <span className="metric-tile-icon" aria-hidden="true">
                    {currentLive.is_day === 1 ? '☀️' : '🌙'}
                  </span>
                  <div>
                    <span className="metric-tile-label text-xs text-muted">Solar Status</span>
                    <strong className="metric-tile-value">
                      {currentLive.is_day === 1 ? 'Daylight' : 'Nighttime'}
                    </strong>
                  </div>
                </div>

                <div className="metric-tile">
                  <span className="metric-tile-icon" aria-hidden="true">📡</span>
                  <div>
                    <span className="metric-tile-label text-xs text-muted">WMO Code</span>
                    <strong className="metric-tile-value">
                      Code {currentLive.weather_code}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 5-Day Outlook Section (Regional Baseline Model) */}
        <section className="section forecast-section">
          <div className="section-header">
            <div className="flex align-center gap-xs" style={{ marginBottom: '0.35rem' }}>
              <span className="badge page-badge">Outlook</span>
              <span className="badge badge-neutral text-xs">Regional Reference Benchmark</span>
            </div>
            <h2 className="section-title">5-Day Agricultural Forecast Model</h2>
            <p className="section-subtitle">
              Five-day regional trajectories to plan planting, chemical application, and irrigation.
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

        {/* Farming Insights Section (Agronomic Advisory Guidelines) */}
        <section className="section farming-insight-section" style={{ paddingTop: 0 }}>
          <div className="card insight-main-card">
            <div className="insight-header">
              <span className="insight-icon" role="img" aria-label="Bulb">💡</span>
              <div>
                <div className="flex align-center gap-xs" style={{ marginBottom: '0.25rem' }}>
                  <h3 className="insight-title" style={{ margin: 0 }}>Agronomic Advisory Guidance</h3>
                  <span className="badge badge-success text-xs">Expert Guidelines</span>
                </div>
                <p className="insight-summary text-muted">
                  "{farmingInsight.summary}"
                </p>
              </div>
            </div>

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
