import React from 'react';
import { Link } from 'react-router-dom';
import './FeatureCard.css';

/**
 * FeatureCard Component
 * 
 * Reusable card representing an individual platform feature.
 * 
 * @param {Object} props
 * @param {string} props.title - Feature title
 * @param {string} props.tag - Categorical badge text
 * @param {string} props.description - Explanatory summary
 * @param {string} props.icon - Emoji or icon representation
 * @param {string} props.link - Route path to navigate to
 * @param {string} props.actionText - Call-to-action button label
 */
function FeatureCard({ title, tag, description, icon, link, actionText = 'Learn More' }) {
  return (
    <div className="card feature-card card-interactive">
      <div className="feature-card-header">
        <span className="feature-icon-wrapper" role="img" aria-label={title}>
          {icon}
        </span>
        {tag && <span className="badge badge-neutral feature-tag">{tag}</span>}
      </div>

      <div className="feature-card-body">
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description text-muted text-sm">{description}</p>
      </div>

      <div className="feature-card-footer">
        <Link to={link} className="btn btn-outline btn-sm btn-block feature-btn">
          {actionText} →
        </Link>
      </div>
    </div>
  );
}

export default FeatureCard;
