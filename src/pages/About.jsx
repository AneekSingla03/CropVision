import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

function About() {
  // 4 Core Pillars
  const corePillars = [
    {
      icon: '🌱',
      title: 'Agronomic Knowledge Base',
      description: 'Standardized growing parameters, temperature tolerances, and soil requirements for 12+ major staple crops.',
    },
    {
      icon: '🔬',
      title: 'AI Disease Diagnostics',
      description: 'Planned computer vision technology to identify leaf pathogens early and prescribe dual organic/chemical remedies.',
    },
    {
      icon: '⛅',
      title: 'Micro-Climate Intelligence',
      description: 'Hyper-local weather forecasting with tailored agricultural advisories for irrigation and chemical spraying.',
    },
    {
      icon: '📈',
      title: 'Mandi Market Transparency',
      description: 'Real-time commodity price tracking and MSP benchmarks to help farmers sell produce at maximum profitability.',
    },
  ];


  const farmerBenefits = [
    {
      num: '01',
      title: 'Maximize Harvest Yields',
      description: 'Science-backed soil preparation, optimal sowing calendars, and crop rotation strategies boost per-acre output.',
    },
    {
      num: '02',
      title: 'Reduce Input Overheads',
      description: 'Precision irrigation advice and targeted fungicide applications minimize water and agro-chemical expenditure.',
    },
    {
      num: '03',
      title: 'Prevent Pre-Harvest Loss',
      description: 'Early pathogen detection and proactive rain warnings allow timely field interventions before severe damage occurs.',
    },
    {
      num: '04',
      title: 'Empower Fair Trade',
      description: 'Comparative mandi market rates eliminate intermediary price opacity and strengthen farmers bargaining power.',
    },
  ];


  const teamMembers = [
    {
      name: 'Aneek Singla',
      role: 'Project Lead & Frontend Engineer',
      dept: 'Department of Computer Science & Engineering',
      icon: '💻',
      bio: 'Responsible for React architecture, component design system, responsive UI layouts, and state management.',
    },
    {
      name: 'Prof. / Project Mentor',
      role: 'Faculty Project Guide',
      dept: 'Academic Project Supervisor',
      icon: '🎓',
      bio: 'Provided academic mentorship, architectural reviews, and agricultural domain validation throughout Evaluation 1.',
    },
  ];

  return (
    <div className="about-page page-wrapper">
      <div className="container">
       
        <header className="page-header about-hero-header text-center">
          <span className="badge page-badge">Academic Project • Evaluation 1</span>
          <h1 className="page-title">About CropVision</h1>
          <p className="page-description">
            Pioneering accessible, digital intelligence for modern sustainable agriculture.
          </p>
        </header>

      
        <section className="card mission-card">
          <div className="mission-grid">
            <div className="mission-text">
              <span className="badge badge-success" style={{ marginBottom: '0.75rem' }}>
                Our Mission
              </span>
              <h2 className="mission-heading">Empowering Growers with Actionable Intelligence</h2>
              <p className="text-muted" style={{ lineHeight: '1.7', marginBottom: '1rem' }}>
                CropVision was conceived as an academic engineering project to bridge the gap between 
                computational technology and real-world agricultural operations.
              </p>
              <p className="text-muted" style={{ lineHeight: '1.7' }}>
                Our mission is to democratize precision farming by placing verified agronomic knowledge, 
                diagnostic health tools, meteorological alerts, and mandi market prices into a single, intuitive interface.
              </p>
            </div>

            <div className="mission-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80"
                alt="Farmer inspecting crops in field"
                className="mission-image"
              />
            </div>
          </div>
        </section>


        <section className="section problem-solution-section">
          <div className="grid-2 problem-solution-grid">
            {/* The Problem */}
            <div className="card problem-card">
              <div className="card-top-icon problem-icon">⚠️</div>
              <span className="badge badge-warning" style={{ marginBottom: '0.5rem' }}>The Challenge</span>
              <h3 className="section-subheading">Agricultural Information Fragmentation</h3>
              <p className="text-muted text-sm" style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                Farmers currently navigate disconnected channels: isolated weather apps, physical mandi notice boards, 
                dense agronomy manuals, and delayed plant pathology testing.
              </p>
              <ul className="problem-list">
                <li>❌ Unpredictable weather shifts lead to washed-out fertilizer applications.</li>
                <li>❌ Delayed leaf disease diagnosis causes widespread yield losses.</li>
                <li>❌ Opaque local market pricing results in undervalued produce sales.</li>
              </ul>
            </div>

            <div className="card solution-card">
              <div className="card-top-icon solution-icon">🌱</div>
              <span className="badge badge-success" style={{ marginBottom: '0.5rem' }}>Our Approach</span>
              <h3 className="section-subheading">Unified Smart Agriculture Platform</h3>
              <p className="text-muted text-sm" style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                CropVision unifies multi-disciplinary agricultural data into a responsive, centralized dashboard 
                tailored for rapid decision-making in the field.
              </p>
              <ul className="solution-list">
                <li>✓ Centralized catalog with 12+ crops and precise cultivation parameters.</li>
                <li>✓ Planned visual computer vision leaf disease diagnosis.</li>
                <li>✓ Real-time weather advisories coupled with transparent mandi market rates.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section pillars-section" style={{ paddingTop: 0 }}>
          <div className="section-header text-center">
            <span className="badge page-badge">Architecture</span>
            <h2 className="section-title">Core Platform Pillars</h2>
            <p className="section-subtitle">
              The fundamental functional pillars underpinning the CropVision architecture.
            </p>
          </div>

          <div className="grid-4">
            {corePillars.map((pillar, idx) => (
              <div key={idx} className="card pillar-card">
                <span className="pillar-icon">{pillar.icon}</span>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-desc text-muted text-sm">{pillar.description}</p>
              </div>
            ))}
          </div>
        </section>


        <section className="section impact-section" style={{ paddingTop: 0 }}>
          <div className="section-header text-center">
            <span className="badge page-badge">Practical Impact</span>
            <h2 className="section-title">How CropVision Helps Farmers</h2>
            <p className="section-subtitle">
              Delivering measurable economic and agronomic advantages directly to farming communities.
            </p>
          </div>

          <div className="grid-2 impact-grid">
            {farmerBenefits.map((benefit) => (
              <div key={benefit.num} className="card impact-card">
                <span className="impact-num">{benefit.num}</span>
                <div className="impact-content">
                  <h3 className="impact-title">{benefit.title}</h3>
                  <p className="impact-desc text-muted text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section team-section" style={{ paddingTop: 0 }}>
          <div className="section-header text-center">
            <span className="badge page-badge">Development Team</span>
            <h2 className="section-title">Project Team & Mentorship</h2>
            <p className="section-subtitle">
              Designed and engineered as part of the College Academic Project for Evaluation 1.
            </p>
          </div>

          <div className="grid-2 team-grid">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="card team-card">
                <div className="team-avatar-box">{member.icon}</div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <span className="badge badge-success text-xs" style={{ marginBottom: '0.35rem' }}>
                    {member.role}
                  </span>
                  <p className="text-xs text-muted" style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                    {member.dept}
                  </p>
                  <p className="text-sm text-muted">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>


        <section className="section about-cta-section" style={{ paddingTop: 0 }}>
          <div className="card about-cta-card text-center">
            <span className="cta-icon" role="img" aria-label="Sprout">🌱</span>
            <h2 className="cta-heading">Join the Future of Smart Agriculture</h2>
            <p className="cta-description text-muted">
              Explore our crop repository, check regional weather insights, or contact our support lab.
            </p>
            <div className="cta-actions flex flex-center gap-md flex-wrap">
              <Link to="/crops" className="btn btn-primary btn-lg">
                Explore Crops Catalog
              </Link>
              <Link to="/contact" className="btn btn-secondary btn-lg">
                Contact Support Team
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
