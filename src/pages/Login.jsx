import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  return (
    <div className="auth-page page-wrapper">
      <div className="container container-sm">
        <div className="card auth-card">
      
          <div className="auth-header text-center">
            <Link to="/" className="auth-brand-logo flex flex-center gap-xs">
              <span className="auth-icon" role="img" aria-label="Sprout">🌱</span>
              <span className="brand-title" style={{ fontSize: '1.4rem' }}>CropVision</span>
            </Link>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle text-muted text-sm">
              Please enter your details to sign in to your farm management portal.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} noValidate>
      
            <div className="form-group">
              <label htmlFor="login-email" className="form-label">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                className="form-input"
                placeholder="farmer@example.com"
              />
            </div>

    
            <div className="form-group">
              <div className="flex flex-between" style={{ marginBottom: '0.4rem' }}>
                <label htmlFor="login-password" className="form-label" style={{ marginBottom: 0 }}>
                  Password
                </label>
                <span className="link text-xs" style={{ cursor: 'pointer' }}>
                  Forgot password?
                </span>
              </div>
              <input
                id="login-password"
                type="password"
                className="form-input"
                placeholder="••••••••"
              />
            </div>

        
            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block auth-submit-btn"
            >
              Login
            </button>
          </form>

      
          <div className="auth-card-footer text-center">
            <p className="text-muted text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="link" style={{ fontWeight: '600' }}>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
