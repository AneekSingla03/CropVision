import { create } from 'zustand';

/**
 * Initial demo entries for the Crop Journal.
 * In-memory state — resets on full page refresh as intended for this educational step.
 */
const initialJournalNotes = [
  {
    id: 'note-wheat-tillage',
    cropName: 'Wheat (गेहूं)',
    title: 'Pre-sowing tillage & fertilization',
    description: 'Applied basal dose of DAP and zinc sulfate across North Plot. Soil moisture is optimal for harrowing.',
    status: 'Completed',
    date: 'Oct 20, 2026',
  },
  {
    id: 'note-rice-water',
    cropName: 'Rice / Paddy (धान)',
    title: 'Water level inspection',
    description: 'Maintained 3-5 cm standing water during the active tillering window. Weed extraction scheduled for tomorrow.',
    status: 'In Progress',
    date: 'Oct 23, 2026',
  },
  {
    id: 'note-cotton-spray',
    cropName: 'Cotton (कपास)',
    title: 'Preventive bio-pesticide spray',
    description: 'Planned foliar neem oil application on lower canopy leaves against early sucking pests.',
    status: 'Planned',
    date: 'Oct 25, 2026',
  },
];

/**
 * Zustand Global Store: Crop Journal Management
 *
 * Demonstrates:
 * - Centralized global state management with Zustand
 * - Immutable state updates using set((state) => ({ ... }))
 * - Clean action dispatchers (addEntry, updateEntry, deleteEntry)
 * - Safe selective updating without mutating unaffected entries
 */
export const useCropJournalStore = create((set) => ({
  // Global state: collection of field notes
  notes: initialJournalNotes,

  /**
   * Action: Add a new journal entry
   * @param {Object} newEntry - The note object to prepend to the list
   */
  addEntry: (newEntry) =>
    set((state) => ({
      notes: [newEntry, ...state.notes],
    })),

  /**
   * Action: Update an existing journal entry by unique ID
   * @param {string} id - The unique identifier of the entry to modify
   * @param {Object} updatedFields - Object containing modified fields (cropName, title, description, status)
   */
  updateEntry: (id, updatedFields) =>
    set((state) => ({
      notes: state.notes.map((entry) =>
        entry.id === id ? { ...entry, ...updatedFields } : entry
      ),
    })),

  /**
   * Action: Delete a journal entry by unique ID
   * @param {string} id - The unique identifier of the entry to remove
   */
  deleteEntry: (id) =>
    set((state) => ({
      notes: state.notes.filter((entry) => entry.id !== id),
    })),
}));

export default useCropJournalStore;
