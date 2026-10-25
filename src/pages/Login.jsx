import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
import './Login.css';

/**
 * Login Page (Eval 2: Form Handling, Reusable FormInput, Validation)
 *
 * Demonstrates:
 * - Controlled inputs using useState
 * - Reusable <FormInput /> component
 * - Basic required-field validation
 *
 * NOTE: This is a frontend-only prototype. No real authentication, account
 * verification, or credential storage is performed.
 */
function Login() {
  const [fields, setFields] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [demoNotice, setDemoNotice] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    setDemoNotice('');

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!fields.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!fields.password) {
      newErrors.password = 'Password is required.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setDemoNotice('');
      return;
    }

    setErrors({});
    setDemoNotice('Validation passed. (Frontend prototype: no backend authentication is performed)');
  };

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
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle text-muted text-sm">
              Please enter your details to sign in to your farm management portal.
            </p>
          </div>

          {demoNotice && (
            <div className="card card-highlight" style={{ padding: '0.75rem 1rem', marginBottom: '1.25rem', textAlign: 'center' }}>
              <p className="text-sm font-semibold" style={{ color: 'var(--color-primary-deep)', margin: 0 }}>
                {demoNotice}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <FormInput
              label="Email"
              id="login-email"
              name="email"
              type="email"
              value={fields.email}
              onChange={handleChange}
              placeholder="farmer@example.com"
              error={errors.email}
              required
              autoComplete="email"
            />

            <FormInput
              label="Password"
              id="login-password"
              name="password"
              type="password"
              value={fields.password}
              onChange={handleChange}
              placeholder="••••••••"
              error={errors.password}
              required
              autoComplete="current-password"
            />

            <div className="flex flex-between" style={{ marginTop: '-0.5rem', marginBottom: '1.25rem' }}>
              <span className="link text-xs" style={{ cursor: 'pointer' }}>
                Forgot password?
              </span>
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
