import React, { useEffect } from 'react';
import './Modal.css';

/**
 * Reusable Modal Component (Eval 2: Modals & Dialogs)
 *
 * Demonstrates:
 * - Conditional rendering based on `isOpen`
 * - Overlay click to dismiss
 * - e.stopPropagation to prevent inside-dialog clicks from closing overlay
 * - Escape key listener for keyboard accessibility
 * - ARIA dialog semantics (role="dialog", aria-modal="true")
 *
 * @param {boolean}  props.isOpen   - Whether modal is visible
 * @param {Function} props.onClose  - Callback to close the modal
 * @param {string}   props.title    - Dialog title
 * @param {ReactNode}props.children - Modal content
 */
function Modal({ isOpen, onClose, title, children }) {
  // Keyboard accessibility: Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Prevent body scrolling while modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 id="modal-dialog-title" className="modal-title">
            {title}
          </h3>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
            title="Close dialog (Esc)"
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
