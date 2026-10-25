import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSavedCrops } from '../context/SavedCropsContext';
import { useToast } from '../context/ToastContext';
import Modal from './Modal';
import './CropCard.css';

/**
 * CropCard Component
 *
 * Demonstrates:
 * - Props: receives a crop object from a parent (ExploreCrops, Home)
 * - useContext (via useSavedCrops): reads global saved-crop state
 * - Modal integration: confirms before removing a saved crop
 * - Toast integration: triggers feedback on save and remove
 * - Conditional rendering: shows "Save" or "Saved ✓"
 *
 * @param {Object} props
 * @param {Object} props.crop - The crop data object from crops.js
 */
function CropCard({ crop }) {
  const { id, name, category, season, description, image } = crop;

  // Consume global contexts
  const { isCropSaved, saveCrop, removeCrop } = useSavedCrops();
  const { showToast } = useToast();

  // Local state for confirmation modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check whether this specific crop is currently saved
  const saved = isCropSaved(id);

  // Triggered on button click
  const handleToggleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (saved) {
      // Open modal to confirm removal
      setIsModalOpen(true);
    } else {
      // Save directly & show success toast
      saveCrop(id);
      showToast(`Added ${name} to saved crops`, 'success');
    }
  };

  // Confirm removal inside modal
  const handleConfirmRemove = () => {
    removeCrop(id);
    setIsModalOpen(false);
    showToast(`Removed ${name} from saved crops`, 'info');
  };

  // Cancel removal inside modal
  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  // Fallback handler if external image fails to load
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src =
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80';
  };

  return (
    <>
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

          {/* Save / Unsave button — overlaid on image corner */}
          <button
            type="button"
            className={`crop-save-btn ${saved ? 'crop-save-btn--saved' : ''}`}
            onClick={handleToggleClick}
            aria-label={saved ? `Remove ${name} from saved crops` : `Save ${name}`}
            title={saved ? 'Remove from Saved Crops' : 'Save this Crop'}
          >
            {saved ? '🌿 Saved' : '+ Save'}
          </button>
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

      {/* Confirmation Modal for Removing Crop */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCancelModal}
        title="Remove Saved Crop"
      >
        <p style={{ margin: '0 0 1.25rem', lineHeight: '1.5' }}>
          Are you sure you want to remove <strong>{name}</strong> from your saved crops list?
        </p>
        <div className="modal-actions" style={{ margin: '-1.5rem', marginTop: '1.25rem', padding: '1rem 1.5rem' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleCancelModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleConfirmRemove}
          >
            Confirm Remove
          </button>
        </div>
      </Modal>
    </>
  );
}

export default CropCard;
