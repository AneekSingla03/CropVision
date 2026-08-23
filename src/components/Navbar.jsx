import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

/**
 * Navbar Component
 * 
 * Demonstrates:
 * - useState hook to manage responsive mobile navigation state (open / closed)
 * - React Router NavLink for automatic active route styling (isActive prop)
 * - Event handling: clicking any navigation link automatically closes the mobile drawer
 */
function Navbar() {
  // useState hook: isMobileMenuOpen holds boolean state, setIsMobileMenuOpen updates it
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper function to toggle the mobile menu state
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  // Helper function to close the mobile menu when a user clicks any navigation link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Helper function for NavLink active styling
  const getNavLinkClass = ({ isActive }) => {
    return isActive ? 'nav-link active' : 'nav-link';
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo & Name (Left) */}
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <span className="brand-icon" role="img" aria-label="Sprout">🌱</span>
          <span className="brand-title">CropVision</span>
        </Link>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className={`mobile-toggle-btn ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>

        {/* Navigation Menu (Center) & Auth Button (Right) */}
        <nav className={`navbar-nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/" className={getNavLinkClass} onClick={closeMobileMenu} end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/crops" className={getNavLinkClass} onClick={closeMobileMenu}>
                Crops
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/disease-detection" className={getNavLinkClass} onClick={closeMobileMenu}>
                Disease Detection
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/weather" className={getNavLinkClass} onClick={closeMobileMenu}>
                Weather
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/market-prices" className={getNavLinkClass} onClick={closeMobileMenu}>
                Market Prices
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/dashboard" className={getNavLinkClass} onClick={closeMobileMenu}>
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className={getNavLinkClass} onClick={closeMobileMenu}>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className={getNavLinkClass} onClick={closeMobileMenu}>
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Right Action: Login Button */}
          <div className="nav-auth">
            <Link to="/login" className="btn btn-primary nav-login-btn" onClick={closeMobileMenu}>
              Login
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
