import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
import './Login.css';

/**
 * Signup Page (Eval 2: Form Handling, Reusable FormInput, Validation)
 *
 * Demonstrates:
 * - Controlled form inputs with useState
 * - Field-level validation (name, email, password, confirm password)
 * - Reusable <FormInput /> component
 * - Conditional rendering: success message vs form
 *
 * This is a FRONTEND PROTOTYPE — no account is created, no data is stored.
 */

// Validation rules (single source of truth — easy to adjust)
const MIN_PASSWORD_LENGTH = 8;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(fields) {
  const errors = {};

  if (!fields.fullName.trim()) {
    errors.fullName = 'Full name is required.';
  }

  if (!fields.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_REGEX.test(fields.email.trim())) {
    errors.email = 'Please enter a valid email address (e.g. name@example.com).';
  }

  if (!fields.password) {
    errors.password = 'Password is required.';
  } else if (fields.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }

  if (!fields.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (fields.password !== fields.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
}

function Signup() {
  // Controlled state for all fields
  const [fields, setFields] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Field-level error messages
  const [errors, setErrors] = useState({});

  // Success state — shown after a valid submission
  const [isSuccess, setIsSuccess] = useState(false);

  // Single handleChange works for all fields via the name attribute
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));

    // Clear the error for this field as soon as the user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(fields);

    if (Object.keys(validationErrors).length > 0) {
      // Validation failed — show errors, stay on the page
      setErrors(validationErrors);
      return;
    }

    // Validation passed — show frontend-only success message
    // Nothing is stored or sent anywhere
    setErrors({});
    setIsSuccess(true);
  };

  const handleReset = () => {
    setFields({ fullName: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <div className="auth-page page-wrapper">
      <div className="container container-sm">
        <div className="card auth-card">

          {/* Brand Header */}
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

          {/* Conditional rendering: success card OR form */}
          {isSuccess ? (
            <div className="signup-success-card text-center">
              <div className="success-icon-circle" style={{ margin: '0 auto 1.25rem' }}>
                <span role="img" aria-label="Success">✅</span>
              </div>
              <h2 style={{ color: 'var(--color-primary-deep)', marginBottom: '0.5rem' }}>
                Registration Successful
              </h2>
              <p className="text-muted text-sm" style={{ marginBottom: '1.5rem' }}>
                Your details have been recorded for this session. This is a frontend-only prototype
                — no account has been saved to a database.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/login" className="btn btn-primary">
                  Go to Login →
                </Link>
                <button type="button" className="btn btn-outline" onClick={handleReset}>
                  Register Again
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Each field uses the reusable FormInput component */}

              <FormInput
                label="Full Name"
                id="signup-fullName"
                name="fullName"
                type="text"
                value={fields.fullName}
                onChange={handleChange}
                placeholder="e.g. Ramesh Kumar"
                error={errors.fullName}
                required
                autoComplete="name"
              />

              <FormInput
                label="Email"
                id="signup-email"
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
                id="signup-password"
                name="password"
                type="password"
                value={fields.password}
                onChange={handleChange}
                placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
                error={errors.password}
                required
                autoComplete="new-password"
              />

              <FormInput
                label="Confirm Password"
                id="signup-confirmPassword"
                name="confirmPassword"
                type="password"
                value={fields.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                error={errors.confirmPassword}
                required
                autoComplete="new-password"
              />

              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block auth-submit-btn"
              >
                Sign Up
              </button>
            </form>
          )}

          {/* Footer link */}
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
