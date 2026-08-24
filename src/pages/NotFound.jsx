import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found-page page-wrapper">
      <div className="container container-sm text-center">
        <div className="card not-found-card">
          <span className="not-found-emoji" role="img" aria-label="Desert / Page missing">
            🌾
          </span>

          <h1 className="not-found-code">404</h1>
          <h2 className="not-found-title">Page Not Found</h2>
          <p className="not-found-description text-muted">
            The page you're looking for doesn't exist.
          </p>

          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary btn-lg">
              Back to Home
            </Link>
          </div>

          <div className="quick-recovery-links">
            <span className="text-xs text-muted">Or explore popular sections:</span>
            <div className="recovery-pills-list">
              <Link to="/crops" className="badge badge-neutral text-xs">
                🌾 Explore Crops
              </Link>
              <Link to="/weather" className="badge badge-neutral text-xs">
                ⛅ Weather
              </Link>
              <Link to="/market-prices" className="badge badge-neutral text-xs">
                📈 Market Prices
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
