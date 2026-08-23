import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { crops } from '../data/crops';
import './CropDetails.css';

/**
 * CropDetails Page Component (Dynamic Route)
 * 
 * Demonstrates:
 * - Dynamic route parameter handling via `useParams()` from react-router-dom
 * - Dynamic data lookup using Array.find()
 * - Conditional rendering: Rendering the detailed crop view or a friendly "Crop Not Found" 404 state
 * - Clean UI layout with growing parameters, cultivation tips, and related crops
 */
function CropDetails() {
  // 1. Extract dynamic :cropId parameter from the URL (e.g. /crops/wheat -> cropId = 'wheat')
  const { cropId } = useParams();

  // 2. Find the corresponding crop object from our static dataset (case-insensitive)
  const crop = crops.find(
    (c) => c.id.toLowerCase() === cropId?.toLowerCase()
  );

  // Fallback handler if image fails to load
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80';
  };

  // 3. INVALID CROP: If no matching crop was found, display friendly error state
  if (!crop) {
    return (
      <div className="crop-details-page page-wrapper">
        <div className="container container-sm text-center">
          <div className="card crop-not-found-card">
            <span className="not-found-icon" role="img" aria-label="Not found">🌾</span>
            <span className="badge badge-warning" style={{ marginBottom: '1rem' }}>
              Crop Not Found
            </span>
            <h1 className="not-found-title">Oops! Crop Information Unavailable</h1>
            <p className="not-found-description text-muted">
              We couldn't find any crop matching the identifier <strong>"{cropId}"</strong> in our agricultural database.
            </p>
            <Link to="/crops" className="btn btn-primary btn-lg">
              ← Back to Explore Crops
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Find 3 other recommended crops in the same category or overall catalog
  const relatedCrops = crops
    .filter((c) => c.id !== crop.id)
    .slice(0, 3);

  // 4. VALID CROP: Render full agronomic details
  return (
    <div className="crop-details-page page-wrapper">
      <div className="container">
        {/* Top Navigation / Breadcrumb */}
        <div className="details-nav-bar">
          <Link to="/crops" className="btn btn-secondary btn-sm back-link-btn">
            ← Back to All Crops
          </Link>
          <span className="breadcrumb-path text-muted text-xs">
            Crops / <span className="text-dark">{crop.category}</span> / <strong>{crop.name}</strong>
          </span>
        </div>

        {/* ===================================================================
            1. CROP OVERVIEW HERO CARD
            =================================================================== */}
        <section className="card crop-hero-card">
          <div className="crop-hero-grid">
            {/* Left: High-resolution Photography */}
            <div className="crop-hero-image-wrapper">
              <img
                src={crop.image}
                alt={crop.name}
                className="crop-hero-image"
                onError={handleImageError}
              />
              <span className="badge crop-hero-badge">{crop.season} Season</span>
            </div>

            {/* Right: Overview & Badges */}
            <div className="crop-hero-info">
              <div className="flex gap-sm" style={{ marginBottom: '0.75rem' }}>
                <span className="badge badge-success">{crop.category}</span>
                <span className="badge badge-neutral">{crop.growingDuration}</span>
              </div>

              <h1 className="crop-details-title">{crop.name}</h1>
              <p className="crop-details-description">{crop.description}</p>

              {/* Quick Metrics Bar */}
              <div className="quick-metrics-grid">
                <div className="metric-pill">
                  <span className="metric-icon">🌡️</span>
                  <div>
                    <span className="metric-title text-xs text-muted">Optimal Temp</span>
                    <strong className="metric-value">{crop.temperature}</strong>
                  </div>
                </div>

                <div className="metric-pill">
                  <span className="metric-icon">💧</span>
                  <div>
                    <span className="metric-title text-xs text-muted">Water Need</span>
                    <strong className="metric-value">{crop.waterRequirement}</strong>
                  </div>
                </div>

                <div className="metric-pill">
                  <span className="metric-icon">🌱</span>
                  <div>
                    <span className="metric-title text-xs text-muted">Sowing Window</span>
                    <strong className="metric-value">{crop.sowingPeriod}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            2. GROWING INFORMATION & SPECIFICATIONS (6 Core Parameters)
            =================================================================== */}
        <section className="growing-info-section">
          <div className="section-header">
            <span className="badge page-badge">Agronomic Specifications</span>
            <h2 className="section-title">Cultivation & Growing Information</h2>
            <p className="section-subtitle">
              Detailed ecological parameters and seasonal windows for maximizing {crop.name} harvest yields.
            </p>
          </div>

          <div className="grid-3 info-cards-grid">
            {/* 1. Ideal Temperature */}
            <div className="card spec-card">
              <div className="spec-icon-box">🌡️</div>
              <div className="spec-content">
                <h3 className="spec-heading">Ideal Temperature</h3>
                <p className="spec-value">{crop.temperature}</p>
                <span className="text-xs text-muted">Optimal range for germination & grain setting</span>
              </div>
            </div>

            {/* 2. Soil Type */}
            <div className="card spec-card">
              <div className="spec-icon-box">🪵</div>
              <div className="spec-content">
                <h3 className="spec-heading">Soil Requirement</h3>
                <p className="spec-value">{crop.soil}</p>
                <span className="text-xs text-muted">Recommended pH: 6.0 - 7.5 with organic matter</span>
              </div>
            </div>

            {/* 3. Water Requirement */}
            <div className="card spec-card">
              <div className="spec-icon-box">💧</div>
              <div className="spec-content">
                <h3 className="spec-heading">Water Requirement</h3>
                <p className="spec-value">{crop.waterRequirement}</p>
                <span className="text-xs text-muted">Critical during vegetative & flowering phases</span>
              </div>
            </div>

            {/* 4. Growing Duration */}
            <div className="card spec-card">
              <div className="spec-icon-box">⏱️</div>
              <div className="spec-content">
                <h3 className="spec-heading">Growing Duration</h3>
                <p className="spec-value">{crop.growingDuration}</p>
                <span className="text-xs text-muted">From seed emergence to field maturity</span>
              </div>
            </div>

            {/* 5. Sowing Period */}
            <div className="card spec-card">
              <div className="spec-icon-box">🌱</div>
              <div className="spec-content">
                <h3 className="spec-heading">Sowing Period</h3>
                <p className="spec-value">{crop.sowingPeriod}</p>
                <span className="text-xs text-muted">Optimal calendar window for field sowing</span>
              </div>
            </div>

            {/* 6. Harvest Period */}
            <div className="card spec-card">
              <div className="spec-icon-box">🚜</div>
              <div className="spec-content">
                <h3 className="spec-heading">Harvest Period</h3>
                <p className="spec-value">{crop.harvestPeriod}</p>
                <span className="text-xs text-muted">Standard harvest window for peak grain quality</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            3. BASIC CULTIVATION TIPS & BEST PRACTICES
            =================================================================== */}
        <section className="cultivation-tips-section">
          <div className="card tips-card">
            <div className="tips-header">
              <span className="tips-icon">💡</span>
              <div>
                <h3 className="tips-title">Cultivation Tips for {crop.name}</h3>
                <p className="text-muted text-sm">
                  Recommended agricultural practices to enhance soil health, protect crops, and ensure high yield.
                </p>
              </div>
            </div>

            <div className="grid-2 tips-grid">
              <div className="tip-item">
                <span className="tip-number">1</span>
                <div>
                  <strong>Field Preparation & Seed Bed</strong>
                  <p className="text-muted text-sm">
                    Plough the field 2-3 times to achieve a fine tilth. Incorporate well-decomposed organic farmyard manure (FYM) before the final harrowing.
                  </p>
                </div>
              </div>

              <div className="tip-item">
                <span className="tip-number">2</span>
                <div>
                  <strong>Irrigation Management</strong>
                  <p className="text-muted text-sm">
                    Ensure adequate soil moisture during critical crown root initiation and flowering stages. Avoid prolonged water stagnation in fields.
                  </p>
                </div>
              </div>

              <div className="tip-item">
                <span className="tip-number">3</span>
                <div>
                  <strong>Integrated Pest & Weed Monitoring</strong>
                  <p className="text-muted text-sm">
                    Conduct regular manual weeding during the first 30–45 days. Use our Disease Detection tool at the first sign of leaf discoloration.
                  </p>
                </div>
              </div>

              <div className="tip-item">
                <span className="tip-number">4</span>
                <div>
                  <strong>Post-Harvest Storage</strong>
                  <p className="text-muted text-sm">
                    Dry produce to recommended moisture levels (under 12%) before storing in clean, pest-resistant silos to prevent fungal aflatoxins.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            4. RELATED CROPS EXPLORATION
            =================================================================== */}
        <section className="related-crops-section">
          <div className="flex flex-between" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h3 style={{ color: 'var(--color-primary-deep)' }}>Explore Other Crops</h3>
              <p className="text-muted text-sm">Discover more staple agricultural commodities in our catalog.</p>
            </div>
            <Link to="/crops" className="btn btn-outline btn-sm">
              View All 12 Crops →
            </Link>
          </div>

          <div className="grid-3 related-crops-grid">
            {relatedCrops.map((item) => (
              <div key={item.id} className="card related-crop-card card-interactive">
                <div className="flex gap-md align-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="related-crop-thumbnail"
                    onError={handleImageError}
                  />
                  <div style={{ flex: 1 }}>
                    <span className="badge text-xs" style={{ marginBottom: '0.25rem' }}>{item.season}</span>
                    <h4 style={{ color: 'var(--color-primary-deep)', fontSize: '1rem', marginBottom: '0.25rem' }}>
                      {item.name}
                    </h4>
                    <Link to={`/crops/${item.id}`} className="link text-sm font-semibold">
                      View Profile →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default CropDetails;
