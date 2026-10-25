import React, { useState } from 'react';
import { crops } from '../data/crops';
import { useToast } from '../context/ToastContext';
import { useCropJournalStore } from '../store/cropJournalStore';
import Modal from '../components/Modal';
import FormInput from '../components/FormInput';
import './CropJournal.css';

function CropJournal() {
  const { showToast } = useToast();

  // Zustand Global State: Read notes and action dispatchers
  const notes = useCropJournalStore((state) => state.notes);
  const addEntry = useCropJournalStore((state) => state.addEntry);
  const updateEntry = useCropJournalStore((state) => state.updateEntry);
  const deleteEntry = useCropJournalStore((state) => state.deleteEntry);

  // Add Note Form State (Local Component State)
  const [newCropName, setNewCropName] = useState(crops[0]?.name || '');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newStatus, setNewStatus] = useState('Planned');
  const [addErrors, setAddErrors] = useState({});

  // Edit Note Modal State (Local Component State)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [editCropName, setEditCropName] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editStatus, setEditStatus] = useState('Planned');
  const [editErrors, setEditErrors] = useState({});

  // Delete Confirmation Modal State (Local Component State)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingNote, setDeletingNote] = useState(null);

  // Validation function
  const validateFormFields = (cropName, title, description, status) => {
    const errors = {};
    if (!cropName || !cropName.trim()) {
      errors.cropName = 'Please select a crop name.';
    }
    if (!title || !title.trim()) {
      errors.title = 'Title is required and cannot be whitespace only.';
    } else if (title.trim().length < 3) {
      errors.title = 'Title must be at least 3 characters.';
    }
    if (!description || !description.trim()) {
      errors.description = 'Description is required and cannot be whitespace only.';
    } else if (description.trim().length < 5) {
      errors.description = 'Description must be at least 5 characters.';
    }
    if (!['Planned', 'In Progress', 'Completed'].includes(status)) {
      errors.status = 'Status must be Planned, In Progress, or Completed.';
    }
    return errors;
  };

  // CREATE: Add new note via Zustand action
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const errors = validateFormFields(newCropName, newTitle, newDescription, newStatus);
    if (Object.keys(errors).length > 0) {
      setAddErrors(errors);
      return;
    }

    const newNote = {
      id: `note-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      cropName: newCropName.trim(),
      title: newTitle.trim(),
      description: newDescription.trim(),
      status: newStatus,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    addEntry(newNote);
    setNewTitle('');
    setNewDescription('');
    setNewStatus('Planned');
    setAddErrors({});
    showToast(`Note "${newNote.title}" added to crop journal!`, 'success');
  };

  // UPDATE: Open edit modal
  const handleOpenEdit = (note) => {
    setEditingNote(note);
    setEditCropName(note.cropName);
    setEditTitle(note.title);
    setEditDescription(note.description);
    setEditStatus(note.status);
    setEditErrors({});
    setIsEditModalOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
    setEditingNote(null);
    setEditErrors({});
  };

  // UPDATE: Save edited note via Zustand action
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingNote) return;

    const errors = validateFormFields(editCropName, editTitle, editDescription, editStatus);
    if (Object.keys(errors).length > 0) {
      setEditErrors(errors);
      return;
    }

    const updatedTitle = editTitle.trim();
    updateEntry(editingNote.id, {
      cropName: editCropName.trim(),
      title: updatedTitle,
      description: editDescription.trim(),
      status: editStatus,
    });

    handleCloseEdit();
    showToast(`Note "${updatedTitle}" updated successfully!`, 'success');
  };

  // DELETE: Open delete confirmation modal
  const handleOpenDelete = (note) => {
    setDeletingNote(note);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDelete = () => {
    setIsDeleteModalOpen(false);
    setDeletingNote(null);
  };

  // DELETE: Confirm deletion via Zustand action
  const handleConfirmDelete = () => {
    if (!deletingNote) return;
    const targetTitle = deletingNote.title;
    const targetId = deletingNote.id;

    deleteEntry(targetId);
    handleCloseDelete();
    showToast(`Note "${targetTitle}" removed from journal.`, 'info');
  };

  // Helper for status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'badge-success';
      case 'In Progress':
        return 'badge-primary';
      case 'Planned':
      default:
        return 'badge-neutral';
    }
  };

  const plannedCount = notes.filter((n) => n.status === 'Planned').length;
  const inProgressCount = notes.filter((n) => n.status === 'In Progress').length;
  const completedCount = notes.filter((n) => n.status === 'Completed').length;

  return (
    <div className="crop-journal-view">
      {/* Header Info Card */}
      <section className="card journal-header-card flex flex-between align-center flex-wrap gap-md">
        <div className="journal-header-title-box">
          <div className="flex align-center gap-xs" style={{ marginBottom: '0.25rem' }}>
            <span className="badge page-badge">Farm Management</span>
            <span className="badge badge-neutral text-xs">In-Memory Journal</span>
          </div>
          <h2 className="journal-main-title">Crop Journal & Field Notes</h2>
          <p className="text-sm text-muted">
            Record agronomic observations, schedule crop treatments, and track field milestones.
          </p>
        </div>

        <div className="journal-stats-pills">
          <span className="badge badge-neutral text-xs">Total: {notes.length}</span>
          <span className="badge badge-neutral text-xs">📋 {plannedCount} Planned</span>
          <span className="badge badge-primary text-xs">⚡ {inProgressCount} In Progress</span>
          <span className="badge badge-success text-xs">✅ {completedCount} Completed</span>
        </div>
      </section>

      {/* CREATE: Add Note Form */}
      <section className="card journal-form-card" aria-label="Add new field note">
        <div className="dash-card-header flex flex-between" style={{ marginBottom: '1.25rem' }}>
          <div>
            <h3 className="dash-card-title">Add Field Note</h3>
            <p className="text-xs text-muted">
              Log an observation, planned task, or completed milestone for any crop.
            </p>
          </div>
        </div>

        <form onSubmit={handleAddSubmit} noValidate>
          <div className="journal-form-grid">
            {/* Crop Name Selection */}
            <div className="form-group">
              <label htmlFor="journal-crop-select" className="form-label">
                Crop Name <span className="form-required-mark" aria-hidden="true">*</span>
              </label>
              <select
                id="journal-crop-select"
                className={`form-select ${addErrors.cropName ? 'input-error' : ''}`}
                value={newCropName}
                onChange={(e) => {
                  setNewCropName(e.target.value);
                  if (addErrors.cropName) setAddErrors((prev) => ({ ...prev, cropName: '' }));
                }}
              >
                {crops.map((crop) => (
                  <option key={crop.id} value={crop.name}>
                    {crop.name}
                  </option>
                ))}
              </select>
              {addErrors.cropName && (
                <span className="error-message" role="alert">{addErrors.cropName}</span>
              )}
            </div>

            {/* Status Selection */}
            <div className="form-group">
              <label htmlFor="journal-status-select" className="form-label">
                Activity Status <span className="form-required-mark" aria-hidden="true">*</span>
              </label>
              <select
                id="journal-status-select"
                className={`form-select ${addErrors.status ? 'input-error' : ''}`}
                value={newStatus}
                onChange={(e) => {
                  setNewStatus(e.target.value);
                  if (addErrors.status) setAddErrors((prev) => ({ ...prev, status: '' }));
                }}
              >
                <option value="Planned">Planned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              {addErrors.status && (
                <span className="error-message" role="alert">{addErrors.status}</span>
              )}
            </div>

            {/* Title Input using FormInput */}
            <div className="journal-form-full">
              <FormInput
                label="Note Title"
                id="journal-note-title"
                name="title"
                type="text"
                value={newTitle}
                onChange={(e) => {
                  setNewTitle(e.target.value);
                  if (addErrors.title) setAddErrors((prev) => ({ ...prev, title: '' }));
                }}
                placeholder="e.g. Foliar zinc micronutrient spray in Plot B"
                error={addErrors.title}
                required
              />
            </div>

            {/* Description Textarea */}
            <div className="journal-form-full form-group">
              <label htmlFor="journal-note-desc" className="form-label">
                Field Observation / Description <span className="form-required-mark" aria-hidden="true">*</span>
              </label>
              <textarea
                id="journal-note-desc"
                className={`form-textarea ${addErrors.description ? 'input-error' : ''}`}
                rows="3"
                value={newDescription}
                onChange={(e) => {
                  setNewDescription(e.target.value);
                  if (addErrors.description) setAddErrors((prev) => ({ ...prev, description: '' }));
                }}
                placeholder="Describe field conditions, dosage, equipment used, or upcoming follow-up..."
              />
              {addErrors.description && (
                <span className="error-message" role="alert">{addErrors.description}</span>
              )}
            </div>
          </div>

          <div className="journal-submit-row">
            <button type="submit" className="btn btn-primary btn-sm">
              ➕ Save Field Note
            </button>
          </div>
        </form>
      </section>

      {/* READ: Journal Entries List */}
      <section className="journal-notes-section" aria-label="Recorded field notes">
        <div className="journal-section-header">
          <h3 className="journal-section-title">
            Recorded Field Notes ({notes.length})
          </h3>
        </div>

        {notes.length > 0 ? (
          <div className="journal-cards-grid">
            {notes.map((note) => (
              <article key={note.id} className="journal-note-card">
                <div>
                  <div className="note-card-header">
                    <span className="note-crop-badge">
                      🌾 {note.cropName}
                    </span>
                    <span className={`badge ${getStatusBadge(note.status)} text-xs`}>
                      {note.status}
                    </span>
                  </div>

                  <h4 className="note-card-title">{note.title}</h4>
                  <p className="note-card-description">{note.description}</p>
                </div>

                <div className="note-card-footer">
                  <span className="note-date-text">📅 {note.date}</span>
                  <div className="note-actions-wrap">
                    <button
                      type="button"
                      className="btn-action-sm"
                      onClick={() => handleOpenEdit(note)}
                      aria-label={`Edit note: ${note.title}`}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      type="button"
                      className="btn-action-sm btn-delete-sm"
                      onClick={() => handleOpenDelete(note)}
                      aria-label={`Delete note: ${note.title}`}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="card empty-state-card text-center" style={{ padding: '3rem 1.5rem' }}>
            <span className="empty-state-icon" role="img" aria-label="No notes">
              📖
            </span>
            <h3 className="empty-state-title">No Field Notes in Journal</h3>
            <p className="empty-state-description text-muted">
              You haven't recorded any crop notes yet. Use the form above to add your first field observation.
            </p>
          </div>
        )}
      </section>

      {/* UPDATE: Reusable Modal for Editing Note */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCloseEdit}
        title="Edit Crop Journal Note"
      >
        <form onSubmit={handleSaveEdit} className="journal-modal-form" noValidate>
          <div className="form-group">
            <label htmlFor="edit-crop-select" className="form-label">
              Crop Name <span className="form-required-mark" aria-hidden="true">*</span>
            </label>
            <select
              id="edit-crop-select"
              className={`form-select ${editErrors.cropName ? 'input-error' : ''}`}
              value={editCropName}
              onChange={(e) => {
                setEditCropName(e.target.value);
                if (editErrors.cropName) setEditErrors((prev) => ({ ...prev, cropName: '' }));
              }}
            >
              {crops.map((crop) => (
                <option key={crop.id} value={crop.name}>
                  {crop.name}
                </option>
              ))}
            </select>
            {editErrors.cropName && (
              <span className="error-message" role="alert">{editErrors.cropName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="edit-status-select" className="form-label">
              Activity Status <span className="form-required-mark" aria-hidden="true">*</span>
            </label>
            <select
              id="edit-status-select"
              className={`form-select ${editErrors.status ? 'input-error' : ''}`}
              value={editStatus}
              onChange={(e) => {
                setEditStatus(e.target.value);
                if (editErrors.status) setEditErrors((prev) => ({ ...prev, status: '' }));
              }}
            >
              <option value="Planned">Planned</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            {editErrors.status && (
              <span className="error-message" role="alert">{editErrors.status}</span>
            )}
          </div>

          <FormInput
            label="Note Title"
            id="edit-note-title"
            name="editTitle"
            type="text"
            value={editTitle}
            onChange={(e) => {
              setEditTitle(e.target.value);
              if (editErrors.title) setEditErrors((prev) => ({ ...prev, title: '' }));
            }}
            placeholder="Title of observation"
            error={editErrors.title}
            required
          />

          <div className="form-group">
            <label htmlFor="edit-note-desc" className="form-label">
              Description <span className="form-required-mark" aria-hidden="true">*</span>
            </label>
            <textarea
              id="edit-note-desc"
              className={`form-textarea ${editErrors.description ? 'input-error' : ''}`}
              rows="3"
              value={editDescription}
              onChange={(e) => {
                setEditDescription(e.target.value);
                if (editErrors.description) setEditErrors((prev) => ({ ...prev, description: '' }));
              }}
              placeholder="Detailed description..."
            />
            {editErrors.description && (
              <span className="error-message" role="alert">{editErrors.description}</span>
            )}
          </div>

          <div className="modal-actions flex gap-sm justify-end" style={{ marginTop: '1rem' }}>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleCloseEdit}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* DELETE: Reusable Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDelete}
        title="Confirm Deletion"
      >
        <div className="journal-delete-dialog">
          <p style={{ lineHeight: '1.6' }}>
            Are you sure you want to delete the field note{' '}
            <strong>"{deletingNote?.title}"</strong> ({deletingNote?.cropName})?
          </p>
          <p className="text-xs text-muted" style={{ marginTop: '0.5rem' }}>
            This note will be permanently removed from your active in-memory field journal.
          </p>

          <div className="modal-actions flex gap-sm justify-end" style={{ marginTop: '1.5rem' }}>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleCloseDelete}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-sm btn-danger-action"
              onClick={handleConfirmDelete}
            >
              🗑️ Delete Note
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CropJournal;
