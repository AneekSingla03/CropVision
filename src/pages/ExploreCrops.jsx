import React, { useState, useMemo } from 'react';
import CropCard from '../components/CropCard';
import { crops } from '../data/crops';
import './ExploreCrops.css';

/**
 * ExploreCrops Page Component
 * 
 * Demonstrates:
 * - useState: Managing searchQuery, selectedCategory, and selectedSeason
 * - useMemo: Performance-optimizing the filtered crop list calculation
 * - Array.prototype.map(): Rendering dynamic lists with unique keys
 * - Conditional Rendering: Switching between crop grid and empty search state
 * - Component Composition & Props: Passing crop objects into reusable <CropCard />
 */
function ExploreCrops() {
  // 1. State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // 2. State for category filter
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 3. State for season filter
  const [selectedSeason, setSelectedSeason] = useState('All Seasons');

  // Filter Categories & Seasons constants
  const categories = ['All', 'Cereals', 'Pulses', 'Oilseeds', 'Cash Crops', 'Vegetables'];
  const seasons = ['All Seasons', 'Kharif', 'Rabi', 'Zaid'];

  // 4. useMemo Hook: Calculates filtered crops when search, category, or season changes
  const filteredCrops = useMemo(() => {
    return crops.filter((crop) => {
      // Name search matching (case-insensitive)
      const matchesSearch = crop.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());

      // Category matching
      const matchesCategory =
        selectedCategory === 'All' || crop.category === selectedCategory;

      // Season matching
      const matchesSeason =
        selectedSeason === 'All Seasons' || crop.season.toLowerCase().includes(selectedSeason.toLowerCase());

      return matchesSearch && matchesCategory && matchesSeason;
    });
  }, [searchQuery, selectedCategory, selectedSeason]);

  // Helper function to reset all active filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedSeason('All Seasons');
  };

  // Check if any filter is currently applied
  const isFiltered = searchQuery !== '' || selectedCategory !== 'All' || selectedSeason !== 'All Seasons';

  return (
    <div className="explore-crops-page page-wrapper">
      <div className="container">
        {/* ===================================================================
            1. PAGE HEADER
            =================================================================== */}
        <header className="page-header explore-header text-center">
          <span className="badge page-badge">Agricultural Knowledge Base</span>
          <h1 className="page-title">Explore Crops</h1>
          <p className="page-description">
            Discover essential information about crops, their growing seasons, and cultivation requirements.
          </p>
        </header>

        {/* ===================================================================
            2. FILTER CONTROLS BAR
            =================================================================== */}
        <section className="card filter-card" aria-label="Crop search and filters">
          {/* Top Row: Search Input & Season Dropdown */}
          <div className="filter-top-row">
            {/* Search Input */}
            <div className="search-box-wrapper">
              <span className="search-icon" role="img" aria-label="Search">🔍</span>
              <input
                type="text"
                className="form-input search-input"
                placeholder="Search crops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search input"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Season Select Filter */}
            <div className="season-select-wrapper">
              <label htmlFor="season-select" className="season-label">
                Season:
              </label>
              <select
                id="season-select"
                className="form-select season-select"
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
              >
                {seasons.map((season) => (
                  <option key={season} value={season}>
                    {season}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bottom Row: Category Pill Buttons */}
          <div className="category-filter-row">
            <span className="category-label">Category:</span>
            <div className="category-pills-list">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`category-pill-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            3. RESULTS COUNT & ACTIVE FILTER META
            =================================================================== */}
        <div className="results-meta-bar flex flex-between">
          <div className="results-count-text">
            <strong>Showing {filteredCrops.length}</strong> of {crops.length} agricultural crops
          </div>

          {isFiltered && (
            <button
              type="button"
              className="btn btn-outline btn-sm clear-filters-link-btn"
              onClick={handleClearFilters}
            >
              Reset All Filters ↺
            </button>
          )}
        </div>

        {/* ===================================================================
            4. CROP GRID OR EMPTY STATE (Conditional Rendering)
            =================================================================== */}
        {filteredCrops.length > 0 ? (
          <div className="crops-grid">
            {filteredCrops.map((crop) => (
              <CropCard key={crop.id} crop={crop} />
            ))}
          </div>
        ) : (
          <div className="card empty-state-card text-center">
            <span className="empty-state-icon" role="img" aria-label="No crops">
              🌾
            </span>
            <h3 className="empty-state-title">No crops found</h3>
            <p className="empty-state-description text-muted">
              Try changing your search keywords or adjusting your selected category and season filters.
            </p>
            <button
              type="button"
              className="btn btn-primary empty-state-btn"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExploreCrops;
