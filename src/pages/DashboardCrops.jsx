import React from 'react';
import { Link } from 'react-router-dom';

/**
 * DashboardCrops (Nested Child Component)
 * 
 * Rendered inside <Outlet /> of <Dashboard /> when route is /dashboard/crops
 */
function DashboardCrops() {
  const activeFarmCrops = [
    {
      id: 'wheat',
      name: 'Wheat (गेहूं)',
      variety: 'Sharbati HD-2967',
      category: 'Cereals',
      season: 'Rabi',
      plot: 'Plot A (North Sector)',
      area: '2.5 Acres',
      sownDate: 'Nov 12, 2025',
      expectedHarvest: 'Apr 2026',
      health: 95,
      status: 'Optimal Health',
      badgeClass: 'badge-success',
      stage: 'Heading / Grain Filling',
      irrigationStatus: 'Adequate (Watered 4 days ago)',
      fertilizerStatus: 'NPK + Urea Applied',
      actionAlert: 'Schedule 2nd post-heading irrigation in 3 days',
    },
    {
      id: 'rice',
      name: 'Rice / Paddy (धान)',
      variety: 'Basmati 1121',
      category: 'Cereals',
      season: 'Kharif',
      plot: 'Plot B (Canal Zone)',
      area: '1.5 Acres',
      sownDate: 'Jul 05, 2025',
      expectedHarvest: 'Nov 2025',
      health: 90,
      status: 'Optimal Health',
      badgeClass: 'badge-success',
      stage: 'Tillering Stage',
      irrigationStatus: 'Continuous Shallow Submergence',
      fertilizerStatus: 'Zinc Sulfate Added',
      actionAlert: 'Inspect for leaf folder activity',
    },
    {
      id: 'cotton',
      name: 'Cotton (कपास)',
      variety: 'Bt Cotton Shankar-6',
      category: 'Cash Crops',
      season: 'Kharif',
      plot: 'Plot C (South High-Drainage)',
      area: '1.0 Acre',
      sownDate: 'May 20, 2025',
      expectedHarvest: 'Dec 2025',
      health: 84,
      status: 'Attention Needed',
      badgeClass: 'badge-warning',
      stage: 'Boll Formation',
      irrigationStatus: 'Drip Regulated',
      fertilizerStatus: 'Potash Boost Pending',
      actionAlert: 'Foliar inspection for sucking pests required',
    },
    {
      id: 'mustard',
      name: 'Mustard (सरसों)',
      variety: 'Pusa Bold 42% Oil',
      category: 'Oilseeds',
      season: 'Rabi',
      plot: 'Plot D (East Terraces)',
      area: '0.8 Acre',
      sownDate: 'Oct 28, 2025',
      expectedHarvest: 'Mar 2026',
      health: 94,
      status: 'Optimal Health',
      badgeClass: 'badge-success',
      stage: 'Pod Maturation & Seed Filling',
      irrigationStatus: 'Moisture Sufficient',
      fertilizerStatus: 'Sulfur Top-Dressing Complete',
      actionAlert: 'Prepare threshing floor and storage bags',
    },
  ];

  return (
    <div className="dashboard-crops-nested-view">
      <div className="card dash-section-card" style={{ marginBottom: '1.5rem' }}>
        <div className="dash-card-header flex flex-between">
          <div>
            <h3 className="dash-card-title">Active Crop Acreage & Plots</h3>
            <p className="text-xs text-muted">
              Monitoring 4 agricultural field crops covering 5.8 total cultivated acres
            </p>
          </div>
          <Link to="/crops" className="btn btn-primary btn-xs">
            + Explore More Crops
          </Link>
        </div>

        <div className="my-crops-detailed-list">
          {activeFarmCrops.map((crop) => (
            <div key={crop.id} className="card crop-detailed-card" style={{ marginBottom: '1.25rem' }}>
              <div className="crop-detail-header flex flex-between">
                <div>
                  <h4 className="crop-detail-title">{crop.name}</h4>
                  <span className="text-xs text-muted">
                    {crop.variety} • <strong>{crop.plot}</strong>
                  </span>
                </div>
                <div className="text-right">
                  <span className={`badge ${crop.badgeClass} text-xs`}>{crop.status}</span>
                  <span className="text-xs text-muted block" style={{ marginTop: '0.2rem' }}>
                    Health: <strong>{crop.health}%</strong>
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="progress-track" style={{ margin: '0.75rem 0 1rem' }}>
                <div
                  className="progress-fill"
                  style={{
                    width: `${crop.health}%`,
                    backgroundColor: crop.health >= 90 ? 'var(--color-success)' : '#d97706',
                  }}
                ></div>
              </div>

              {/* Specs Grid */}
              <div className="grid-4 crop-specs-grid" style={{ marginBottom: '1rem' }}>
                <div className="spec-mini-item">
                  <span className="text-xs text-muted">Acreage:</span>
                  <strong className="text-sm block">{crop.area}</strong>
                </div>
                <div className="spec-mini-item">
                  <span className="text-xs text-muted">Growth Stage:</span>
                  <strong className="text-sm block">{crop.stage}</strong>
                </div>
                <div className="spec-mini-item">
                  <span className="text-xs text-muted">Sowing Date:</span>
                  <strong className="text-sm block">{crop.sownDate}</strong>
                </div>
                <div className="spec-mini-item">
                  <span className="text-xs text-muted">Expected Harvest:</span>
                  <strong className="text-sm block">{crop.expectedHarvest}</strong>
                </div>
              </div>

              {/* Alert Bar & Link */}
              <div className="crop-alert-footer flex flex-between">
                <span className="text-xs" style={{ color: 'var(--color-primary-deep)' }}>
                  ⚡ <strong>Action Alert:</strong> {crop.actionAlert}
                </span>
                <Link to={`/crops/${crop.id}`} className="link text-xs font-semibold">
                  Full Agronomy Profile →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardCrops;
