import React from 'react';
import './FormInput.css';

/**
 * FormInput — Reusable controlled input component (Eval 2: Form Handling)
 *
 * Demonstrates:
 * - Reusable component with props
 * - Accessible label/input association via htmlFor + id
 * - Conditional error styling and inline error message
 * - Supports: text, email, password
 *
 * @param {string}   label       - Visible label text
 * @param {string}   id          - Unique id; also used as htmlFor on the label
 * @param {string}   name        - input name attribute (matches formData key)
 * @param {string}   type        - 'text' | 'email' | 'password'
 * @param {string}   value       - Controlled value from parent state
 * @param {function} onChange    - onChange handler from parent
 * @param {string}   placeholder - Placeholder text
 * @param {string}   error       - Error message string; empty/undefined = no error
 * @param {boolean}  required    - Adds * suffix to label when true
 * @param {string}   autoComplete- Browser autocomplete hint
 */
function FormInput({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  required = false,
  autoComplete = 'off',
}) {
  return (
    <div className="form-group">
      {/* Properly associated label — clicking it focuses the input */}
      <label htmlFor={id} className="form-label">
        {label}
        {required && (
          <span className="form-required-mark" aria-hidden="true">
            {' '}*
          </span>
        )}
      </label>

      {/* Controlled input — value + onChange make this a controlled component */}
      <input
        id={id}
        type={type}
        name={name}
        className={`form-input${error ? ' input-error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? 'true' : undefined}
      />

      {/* Field-level error message — only rendered when an error exists */}
      {error && (
        <span id={`${id}-error`} className="error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export default FormInput;
