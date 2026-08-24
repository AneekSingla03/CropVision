import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const getSubNavClass = ({ isActive }) => {
    return isActive ? 'dash-subnav-link active' : 'dash-subnav-link';
  };

  return (
    <div className="dashboard-page page-wrapper">
      <div className="container">

        <header className="dashboard-topbar card flex flex-between">
          <div className="farmer-profile-meta flex align-center gap-md">
            <div className="farmer-avatar-circle" role="img" aria-label="Farmer avatar">
              👨‍🌾
            </div>
            <div>
              <span className="badge badge-success text-xs" style={{ marginBottom: '0.25rem' }}>
                Evaluation 1 Demo Dashboard
              </span>
              <h1 className="farmer-welcome-title">Good Morning, Farmer 👋</h1>
              <p className="dashboard-subtitle text-muted text-sm">
                Here is an overview of your farming activities.
              </p>
            </div>
          </div>
        </header>

        <div className="dash-subnav-bar">
          <NavLink to="/dashboard/overview" className={getSubNavClass}>
            📊 Overview
          </NavLink>
          <NavLink to="/dashboard/crops" className={getSubNavClass}>
            🌾 My Crops
          </NavLink>
          <NavLink to="/dashboard/activities" className={getSubNavClass}>
            📅 Activities
          </NavLink>
        </div>

        <main className="dash-content-outlet">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
