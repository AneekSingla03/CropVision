import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Signup() {
  return (
    <div className="auth-page page-wrapper">
      <div className="container container-sm">
        <div className="card auth-card">
          {/* Brand Logo & Header */}
          <div className="auth-header text-center">
            <Link to="/" className="auth-brand-logo flex flex-center gap-xs">
              <span className="auth-icon" role="img" aria-label="Sprout">🌱</span>
              <span className="brand-title" style={{ fontSize: '1.4rem' }}>CropVision</span>
            </Link>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle text-muted text-sm">
              Register for a smart agriculture farmer account
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} noValidate>

            <div className="form-group">
              <label htmlFor="signup-name" className="form-label">
                Full Name
              </label>
              <input
                id="signup-name"
                type="text"
                className="form-input"
                placeholder="e.g. Ramesh Kumar"
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-email" className="form-label">
                Email
              </label>
              <input
                id="signup-email"
                type="email"
                className="form-input"
                placeholder="farmer@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-password" className="form-label">
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                className="form-input"
                placeholder="••••••••"
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-confirm-password" className="form-label">
                Confirm Password
              </label>
              <input
                id="signup-confirm-password"
                type="password"
                className="form-input"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block auth-submit-btn"
            >
              Signup
            </button>
          </form>

          <div className="auth-card-footer text-center">
            <p className="text-muted text-sm">
              Already have an account?{' '}
              <Link to="/login" className="link" style={{ fontWeight: '600' }}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
