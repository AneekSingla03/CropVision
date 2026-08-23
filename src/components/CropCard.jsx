import React from 'react';
import { Link } from 'react-router-dom';
import './CropCard.css';

/**
 * CropCard Component
 * 
 * Reusable card displaying an agricultural crop's preview profile.
 * Includes graceful image error fallback handling.
 * 
 * @param {Object} props
 * @param {Object} props.crop - The crop data object
 */
function CropCard({ crop }) {
  const { id, name, category, season, description, image } = crop;

  // Fallback handler if external image fails to load
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80';
  };

  return (
    <div className="card crop-card card-interactive">
      {/* Crop Photography Banner */}
      <div className="crop-image-container">
        <img 
          src={image} 
          alt={name} 
          className="crop-image" 
          loading="lazy"
          onError={handleImageError}
        />
        <span className="badge crop-badge">{season}</span>
      </div>

      {/* Crop Metadata & Content */}
      <div className="crop-content">
        <div className="crop-header">
          <h3 className="crop-name">{name}</h3>
          <span className="crop-category text-muted text-xs">{category}</span>
        </div>

        <p className="crop-description text-muted text-sm">{description}</p>

        {/* View Details CTA Button navigating to dynamic route */}
        <div className="crop-action">
          <Link to={`/crops/${id}`} className="btn btn-primary btn-sm btn-block crop-btn">
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CropCard;
