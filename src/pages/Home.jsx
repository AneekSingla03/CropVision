import React from 'react';
import { Link } from 'react-router-dom';

import FeatureCard from '../components/FeatureCard';
import CropCard from '../components/CropCard';

import { cropsData } from '../data/cropsData';
import {
  statisticsData,
  coreFeaturesData,
  howItWorksSteps,
  whyChooseUsBenefits,
  dashboardPreviewData,
} from '../data/homeData';

import './Home.css';

function Home() {

  const featuredCrops = cropsData.slice(0, 6);

  return (
    <div className="home-page">

      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
   
            <div className="hero-text-content">
              <span className="badge badge-success hero-badge">
                🌱 Smart Agriculture Platform
              </span>
              <h1 className="hero-heading">
                Smarter Farming.<br />
                <span className="hero-heading-accent">Better Decisions.</span>
              </h1>
              <p className="hero-description">
                CropVision brings crop knowledge, crop health insights, weather information, 
                market information, and smart farming tools into one platform.
              </p>
              <div className="hero-actions">
                <Link to="/crops" className="btn btn-primary btn-lg hero-btn">
                  Explore Crops
                </Link>
                <Link to="/dashboard" className="btn btn-secondary btn-lg hero-btn">
                  View Dashboard
                </Link>
              </div>
            </div>

         
            <div className="hero-image-wrapper">
              <div className="hero-image-card">
                <img
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1000&q=80"
                  alt="Modern sustainable agriculture farm field"
                  className="hero-main-image"
                />
                <div className="hero-floating-card top-float">
                  <span className="floating-icon">🌾</span>
                  <div>
                    <strong>Precision Agriculture</strong>
                    <p className="text-xs text-muted">Optimized for high yield</p>
                  </div>
                </div>
                <div className="hero-floating-card bottom-float">
                  <span className="floating-icon">🔬</span>
                  <div>
                    <strong>Instant Leaf Diagnosis</strong>
                    <p className="text-xs text-muted">Identify crop diseases early</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {statisticsData.map((stat) => (
              <div key={stat.id} className="stat-card">
                <span className="stat-icon" role="img" aria-label={stat.label}>
                  {stat.icon}
                </span>
                <h3 className="stat-value">{stat.value}</h3>
                <h4 className="stat-label">{stat.label}</h4>
                <p className="stat-description text-muted text-xs">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="about-overview-section">
        <div className="container">
          <div className="about-overview-grid">
            <div className="about-image-column">
              <img
                src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80"
                alt="Farmer checking wheat crops in field"
                className="about-image"
              />
            </div>
            <div className="about-text-column">
              <span className="badge page-badge">About CropVision</span>
              <h2 className="section-title">Unifying Agricultural Intelligence for Every Farmer</h2>
              <p className="about-paragraph">
                <strong>What is CropVision?</strong> CropVision is an academic smart agriculture platform 
                engineered to streamline farm management and agricultural decision-making by consolidating essential 
                farming data into a single, intuitive interface.
              </p>
              <p className="about-paragraph text-muted">
                <strong>The Problem We Solve:</strong> Farmers traditionally rely on disconnected channels—scattered 
                weather apps, local word-of-mouth, physical mandi notice boards, and dense agronomic textbooks. 
                This fragmented approach causes delayed disease interventions and sub-optimal harvest sales.
              </p>
              <p className="about-paragraph text-muted">
                <strong>Why One Unified Platform Matters:</strong> By connecting crop parameters, instant visual disease 
                detection, localized weather forecasts, and live commodity mandi pricing in real-time, CropVision empowers 
                growers to make proactive, data-backed decisions.
              </p>
              <div className="about-highlights">
                <div className="about-highlight-item">
                  <span className="check-icon">✓</span>
                  <span>Science-backed soil & seasonal calendars</span>
                </div>
                <div className="about-highlight-item">
                  <span className="check-icon">✓</span>
                  <span>Proactive climate advisories</span>
                </div>
                <div className="about-highlight-item">
                  <span className="check-icon">✓</span>
                  <span>Transparent mandi market rates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="features-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge page-badge">Comprehensive Capabilities</span>
            <h2 className="section-title">Smart Agriculture Features</h2>
            <p className="section-subtitle">
              Tools designed to simplify daily agricultural operations, boost crop yields, and maximize profitability.
            </p>
          </div>

          <div className="grid-3">
            {coreFeaturesData.map((feature) => (
              <FeatureCard
                key={feature.id}
                title={feature.title}
                tag={feature.tag}
                description={feature.description}
                icon={feature.icon}
                link={feature.link}
                actionText={feature.actionText}
              />
            ))}
          </div>
        </div>
      </section>


      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge page-badge">Simple 4-Step Process</span>
            <h2 className="section-title">How CropVision Works</h2>
            <p className="section-subtitle">
              Follow our straightforward workflow to transform raw agricultural data into higher harvest returns.
            </p>
          </div>

          <div className="grid-4">
            {howItWorksSteps.map((step) => (
              <div key={step.stepNumber} className="card step-card">
                <span className="step-number">{step.stepNumber}</span>
                <span className="step-icon" role="img" aria-label={step.title}>
                  {step.icon}
                </span>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description text-muted text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="featured-crops-section">
        <div className="container">
          <div className="section-header-flex">
            <div>
              <span className="badge page-badge">Crop Library</span>
              <h2 className="section-title">Featured Agricultural Crops</h2>
              <p className="section-subtitle">
                Explore agronomic profiles, seasonal requirements, and cultivation advice for major staple crops.
              </p>
            </div>
            <Link to="/crops" className="btn btn-secondary view-all-btn">
              View All Crops →
            </Link>
          </div>

          <div className="grid-3">
            {featuredCrops.map((crop) => (
              <CropCard key={crop.id} crop={crop} />
            ))}
          </div>
        </div>
      </section>


      <section className="why-us-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge page-badge">Platform Advantages</span>
            <h2 className="section-title">Why Choose CropVision</h2>
            <p className="section-subtitle">
              Purpose-built to bridge scientific agronomic knowledge and practical on-field farming operations.
            </p>
          </div>

          <div className="grid-2">
            {whyChooseUsBenefits.map((benefit) => (
              <div key={benefit.id} className="card benefit-card">
                <div className="benefit-icon-box">
                  <span role="img" aria-label={benefit.title}>{benefit.icon}</span>
                </div>
                <div className="benefit-content">
                  <div className="flex flex-between" style={{ marginBottom: '0.35rem' }}>
                    <h3 className="benefit-title">{benefit.title}</h3>
                    <span className="badge badge-success text-xs">{benefit.badge}</span>
                  </div>
                  <p className="benefit-description text-muted text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="dashboard-preview-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge badge-warning page-badge">Live Demonstration Preview</span>
            <h2 className="section-title">Farmer Intelligence Dashboard</h2>
            <p className="section-subtitle">
              A centralized control center giving you an instant overview of your active fields, health metrics, and mandi rates.
            </p>
          </div>

          <div className="dashboard-preview-window card">
  
            <div className="preview-topbar">
              <div className="preview-profile-info">
                <span className="farmer-avatar">👨‍🌾</span>
                <div>
                  <strong className="farmer-name">{dashboardPreviewData.farmerName}</strong>
                  <span className="farmer-location text-xs text-muted">
                    📍 {dashboardPreviewData.location} • {dashboardPreviewData.lastUpdated}
                  </span>
                </div>
              </div>
              <Link to="/dashboard" className="btn btn-primary btn-sm">
                Open Full Dashboard ↗
              </Link>
            </div>


            <div className="preview-widgets-grid">

              <div className="card preview-widget-card">
                <div className="widget-header">
                  <span className="widget-icon">🌱</span>
                  <span className="badge badge-success text-xs">Crop Health</span>
                </div>
                <h3 className="widget-value">{dashboardPreviewData.cropHealth.score}</h3>
                <p className="widget-status">{dashboardPreviewData.cropHealth.status}</p>
                <span className="text-xs text-muted">{dashboardPreviewData.cropHealth.monitoredFields}</span>
              </div>


              <div className="card preview-widget-card">
                <div className="widget-header">
                  <span className="widget-icon">⛅</span>
                  <span className="badge badge-warning text-xs">Weather Alert</span>
                </div>
                <h3 className="widget-value">{dashboardPreviewData.weatherAlert.temperature}</h3>
                <p className="widget-status">{dashboardPreviewData.weatherAlert.condition}</p>
                <span className="text-xs text-muted">{dashboardPreviewData.weatherAlert.rainForecast}</span>
              </div>

   
              <div className="card preview-widget-card">
                <div className="widget-header">
                  <span className="widget-icon">📈</span>
                  <span className="badge badge-success text-xs">Mandi Prices</span>
                </div>
                <h3 className="widget-value">{dashboardPreviewData.marketPriceSummary.currentRate}</h3>
                <p className="widget-status" style={{ color: 'var(--color-success)' }}>
                  {dashboardPreviewData.marketPriceSummary.change}
                </p>
                <span className="text-xs text-muted">{dashboardPreviewData.marketPriceSummary.crop}</span>
              </div>

     
              <div className="card preview-widget-card">
                <div className="widget-header">
                  <span className="widget-icon">🚜</span>
                  <span className="badge badge-neutral text-xs">Next Activity</span>
                </div>
                <h3 className="widget-value" style={{ fontSize: '1.2rem' }}>
                  {dashboardPreviewData.upcomingActivity.title}
                </h3>
                <p className="widget-status">{dashboardPreviewData.upcomingActivity.scheduledDate}</p>
                <span className="text-xs text-muted">{dashboardPreviewData.upcomingActivity.field}</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="final-cta-section">
        <div className="container container-sm text-center">
          <div className="final-cta-card">
            <span className="cta-icon">🌾</span>
            <h2 className="cta-heading">Grow Smarter with CropVision</h2>
            <p className="cta-description text-muted">
              Equip your agricultural journey with real-time agronomic data, disease protection, and mandi price insights.
            </p>
            <div className="cta-buttons">
              <Link to="/crops" className="btn btn-primary btn-lg">
                Explore Crops Now
              </Link>
              <Link to="/signup" className="btn btn-secondary btn-lg">
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
