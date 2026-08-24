import React from 'react';
import { Link } from 'react-router-dom';

function DashboardOverview() {

  const myDemoCrops = [
    { id: 'c1', name: 'Wheat', variety: 'Sharbati HD-2967', season: 'Rabi', health: '95%', status: 'Healthy', badge: 'badge-success' },
    { id: 'c2', name: 'Rice', variety: 'Basmati 1121', season: 'Kharif', health: '90%', status: 'Healthy', badge: 'badge-success' },
    { id: 'c3', name: 'Cotton', variety: 'Bt Cotton Shankar-6', season: 'Kharif', health: '84%', status: 'Needs Attention', badge: 'badge-warning' },
    { id: 'c4', name: 'Mustard', variety: 'Pusa Bold', season: 'Rabi', health: '94%', status: 'Healthy', badge: 'badge-success' },
  ];


  const demoMarketPrices = [
    { crop: 'Wheat', price: '₹2,400/q', trend: '↑' },
    { crop: 'Rice', price: '₹3,100/q', trend: '↑' },
    { crop: 'Cotton', price: '₹7,200/q', trend: '↑' },
  ];


  const demoActivities = [
    { id: 'a1', title: 'Irrigation', date: 'Tomorrow, 07:00 AM', status: 'Scheduled', badge: 'badge-primary', icon: '💧' },
    { id: 'a2', title: 'Field Inspection', date: 'Feb 25, 2026', status: 'Planned', badge: 'badge-neutral', icon: '🔬' },
    { id: 'a3', title: 'Fertilizer Application', date: 'Feb 27, 2026', status: 'Pending Window', badge: 'badge-warning', icon: '🌱' },
    { id: 'a4', title: 'Harvest Planning', date: 'Mar 15, 2026', status: 'Upcoming', badge: 'badge-success', icon: '🚜' },
  ];

  return (
    <div className="dashboard-nested-view">
      
      <section className="dashboard-metrics-grid" aria-label="Farm statistics">
        <div className="card dash-stat-card">
          <div className="stat-top flex flex-between">
            <span className="stat-label text-xs text-muted font-semibold">My Crops</span>
            <span className="stat-icon-sm">🌾</span>
          </div>
          <h2 className="dash-stat-value">4</h2>
          <span className="badge badge-neutral text-xs">Active Field Crops</span>
        </div>

        <div className="card dash-stat-card">
          <div className="stat-top flex flex-between">
            <span className="stat-label text-xs text-muted font-semibold">Crop Health</span>
            <span className="stat-icon-sm">🌱</span>
          </div>
          <h2 className="dash-stat-value" style={{ color: 'var(--color-success)' }}>
            92%
          </h2>
          <span className="badge badge-success text-xs">Good Health</span>
        </div>

    
        <div className="card dash-stat-card">
          <div className="stat-top flex flex-between">
            <span className="stat-label text-xs text-muted font-semibold">Weather</span>
            <span className="stat-icon-sm">⛅</span>
          </div>
          <h2 className="dash-stat-value">28°C</h2>
          <span className="badge badge-neutral text-xs">Partly Cloudy</span>
        </div>

       
        <div className="card dash-stat-card">
          <div className="stat-top flex flex-between">
            <span className="stat-label text-xs text-muted font-semibold">Market Price</span>
            <span className="stat-icon-sm">📈</span>
          </div>
          <h2 className="dash-stat-value" style={{ color: 'var(--color-primary-deep)' }}>
            ₹2,400/q
          </h2>
          <span className="badge badge-success text-xs">Wheat Mandi Rate</span>
        </div>
      </section>

      
      <div className="dashboard-main-layout-grid">
      
        <div className="dashboard-left-col">
      
          <section className="card dash-section-card">
            <div className="dash-card-header flex flex-between">
              <div>
                <h3 className="dash-card-title">My Crops</h3>
                <p className="text-xs text-muted">Static demonstration crops</p>
              </div>
              <Link to="/dashboard/crops" className="btn btn-outline btn-xs">
                View All Crops →
              </Link>
            </div>

            <div className="my-crops-grid">
              {myDemoCrops.map((crop) => (
                <div key={crop.id} className="card crop-item-card">
                  <div className="flex flex-between" style={{ marginBottom: '0.35rem' }}>
                    <strong className="crop-item-name">{crop.name}</strong>
                    <span className={`badge ${crop.badge} text-xs`}>{crop.status}</span>
                  </div>
                  <p className="text-xs text-muted" style={{ marginBottom: '0.5rem' }}>
                    {crop.variety} • Season: {crop.season}
                  </p>
                  <div className="flex flex-between text-xs">
                    <span className="text-muted">Health Score:</span>
                    <strong>{crop.health}</strong>
                  </div>
                </div>
              ))}
            </div>
          </section>


          <section className="card dash-section-card">
            <h3 className="dash-card-title" style={{ marginBottom: '1rem' }}>
              Quick Farm Actions
            </h3>
            <div className="shortcuts-list">
              <Link to="/crops" className="shortcut-btn card flex align-center gap-md">
                <span className="shortcut-icon">🌾</span>
                <div>
                  <strong>Explore All Crops</strong>
                  <p className="text-xs text-muted">View 12 crop profiles and cultivation guides</p>
                </div>
              </Link>

              <Link to="/disease-detection" className="shortcut-btn card flex align-center gap-md">
                <span className="shortcut-icon">🔬</span>
                <div>
                  <strong>Disease Detection</strong>
                  <p className="text-xs text-muted">Crop disease diagnostics interface prototype</p>
                </div>
              </Link>

              <Link to="/weather" className="shortcut-btn card flex align-center gap-md">
                <span className="shortcut-icon">⛅</span>
                <div>
                  <strong>Weather Intelligence</strong>
                  <p className="text-xs text-muted">Agricultural forecast & farming advisories</p>
                </div>
              </Link>

              <Link to="/market-prices" className="shortcut-btn card flex align-center gap-md">
                <span className="shortcut-icon">📈</span>
                <div>
                  <strong>Market Mandi Prices</strong>
                  <p className="text-xs text-muted">Commodity market rates and MSP trends</p>
                </div>
              </Link>
            </div>
          </section>
        </div>

       
        <div className="dashboard-right-col">
        
          <section className="card dash-section-card">
            <div className="dash-card-header flex flex-between">
              <div>
                <h3 className="dash-card-title">Weather Preview</h3>
                <p className="text-xs text-muted">Static weather information</p>
              </div>
              <Link to="/weather" className="btn btn-outline btn-xs">
                Full Weather →
              </Link>
            </div>

            <div className="weather-preview-body">
              <div className="weather-preview-main flex align-center gap-md">
                <span className="weather-preview-icon">⛅</span>
                <div>
                  <h4 className="weather-preview-temp">28°C</h4>
                  <span className="weather-preview-condition text-sm font-semibold">Partly Cloudy</span>
                </div>
              </div>

              <div className="weather-preview-details-grid">
                <div className="weather-detail-item">
                  <span className="text-xs text-muted">Humidity:</span>
                  <strong className="text-sm">62%</strong>
                </div>
                <div className="weather-detail-item">
                  <span className="text-xs text-muted">Rain Chance:</span>
                  <strong className="text-sm">20%</strong>
                </div>
              </div>
            </div>
          </section>

        
          <section className="card dash-section-card">
            <div className="dash-card-header flex flex-between">
              <div>
                <h3 className="dash-card-title">Market Preview</h3>
                <p className="text-xs text-muted">Static demonstration prices</p>
              </div>
              <Link to="/market-prices" className="btn btn-outline btn-xs">
                Full Mandi Rates →
              </Link>
            </div>

            <div className="market-preview-list">
              {demoMarketPrices.map((item, idx) => (
                <div key={idx} className="market-preview-row flex flex-between">
                  <strong className="market-crop-name text-sm">{item.crop} — {item.price}</strong>
                  <span className="badge badge-success text-xs">{item.trend}</span>
                </div>
              ))}
            </div>
          </section>

        
          <section className="card dash-section-card">
            <div className="dash-card-header flex flex-between">
              <div>
                <h3 className="dash-card-title">Upcoming Activities</h3>
                <p className="text-xs text-muted">Scheduled field tasks</p>
              </div>
              <Link to="/dashboard/activities" className="btn btn-outline btn-xs">
                All Activities →
              </Link>
            </div>

            <div className="activities-list">
              {demoActivities.map((act) => (
                <div key={act.id} className="activity-item card flex flex-between">
                  <div className="flex align-center gap-md">
                    <span className="activity-icon">{act.icon}</span>
                    <strong className="activity-title text-sm">{act.title}</strong>
                  </div>
                  <span className={`badge ${act.badge} text-xs`}>{act.status}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
