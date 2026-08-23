import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

/**
 * Footer Component
 * 
 * Demonstrates:
 * - Professional multi-column footer architecture
 * - Integration of Quick Links, Features, Contact Information, Social Icons, and Copyright
 * - Reusable semantic HTML structure
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Column 1: Brand, Description & Social Icons */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <span className="footer-icon" role="img" aria-label="Sprout">🌱</span>
              <span className="footer-title">CropVision</span>
            </div>
            <p className="footer-description">
              A smart agriculture platform empowering farmers and agronomists with crop advisory, 
              leaf disease detection, real-time weather alerts, and live market prices.
            </p>

            {/* Social Media Links */}
            <div className="footer-social-links">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 1 0 0-2.9 1.45 1.45 0 0 0 0 2.9m1.37 9.74v-8.37H5.09v8.37h2.74z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About CropVision</Link></li>
              <li><Link to="/contact">Contact Support</Link></li>
              <li><Link to="/login">Sign In</Link></li>
              <li><Link to="/signup">Register Account</Link></li>
            </ul>
          </div>

          {/* Column 3: Platform Features */}
          <div className="footer-col">
            <h4 className="footer-heading">Features</h4>
            <ul className="footer-links">
              <li><Link to="/crops">Explore Crops</Link></li>
              <li><Link to="/disease-detection">Disease Detection</Link></li>
              <li><Link to="/weather">Weather Insights</Link></li>
              <li><Link to="/market-prices">Market Prices (Mandi)</Link></li>
              <li><Link to="/dashboard">Farmer Dashboard</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="footer-col">
            <h4 className="footer-heading">Contact & Support</h4>
            <ul className="footer-contact-info">
              <li>
                <span className="contact-icon">📍</span>
                <span>Agriculture Tech Park, Innovation Block 4</span>
              </li>
              <li>
                <span className="contact-icon">📧</span>
                <span>support@cropvision.demo</span>
              </li>
              <li>
                <span className="contact-icon">📞</span>
                <span>+91 98765 43210 (Toll-Free Helpline)</span>
              </li>
              <li>
                <span className="contact-icon">🕒</span>
                <span>Mon - Sat: 9:00 AM - 6:00 PM IST</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Academic Project Notice */}
        <div className="footer-bottom">
          <p>© {currentYear} CropVision. All rights reserved. Built with React & Vite for Smart Agriculture.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
