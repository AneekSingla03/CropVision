import React, { createContext, useContext, useState } from 'react';

/**
 * SavedCropsContext — Evaluation 2: Context API & Global State
 *
 * Demonstrates:
 * - createContext: creates a shared context object
 * - useContext: lets any component read from the context
 * - useState: holds the collection of saved crop IDs (global state)
 *
 * The saved-crop IDs are stored in a plain array.
 * Functions to save, remove, and check a crop are provided through the same context value.
 */

// 1. Create the context object (default value is undefined — caught by the custom hook below)
const SavedCropsContext = createContext(undefined);

// 2. Provider component — wraps the app and supplies the shared state
export function SavedCropsProvider({ children }) {
  // Global state: array of saved crop IDs, e.g. ['wheat', 'rice']
  const [savedCropIds, setSavedCropIds] = useState([]);

  // Save a crop by its id — prevents duplicates with a simple includes check
  const saveCrop = (cropId) => {
    setSavedCropIds((prev) => {
      if (prev.includes(cropId)) return prev; // already saved, no change
      return [...prev, cropId];
    });
  };

  // Remove a saved crop by its id
  const removeCrop = (cropId) => {
    setSavedCropIds((prev) => prev.filter((id) => id !== cropId));
  };

  // Returns true if a given cropId is currently saved
  const isCropSaved = (cropId) => savedCropIds.includes(cropId);

  // The value object shared with every consumer component
  const contextValue = {
    savedCropIds,   // the array — used to render count or a saved list
    saveCrop,       // call to save
    removeCrop,     // call to unsave
    isCropSaved,    // call to check status
  };

  return (
    <SavedCropsContext.Provider value={contextValue}>
      {children}
    </SavedCropsContext.Provider>
  );
}

// 3. Custom hook — clean, safe way to consume the context
//    Throws a clear error if used outside the provider (helps during development)
export function useSavedCrops() {
  const context = useContext(SavedCropsContext);
  if (context === undefined) {
    throw new Error('useSavedCrops must be used inside <SavedCropsProvider>');
  }
  return context;
}
