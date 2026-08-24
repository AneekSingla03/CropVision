import React, { useState, useMemo } from 'react';
import CropCard from '../components/CropCard';
import { crops } from '../data/crops';
import './ExploreCrops.css';

function ExploreCrops() {
  
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('All');

  const [selectedSeason, setSelectedSeason] = useState('All Seasons');

  const categories = ['All', 'Cereals', 'Pulses', 'Oilseeds', 'Cash Crops', 'Vegetables'];
  const seasons = ['All Seasons', 'Kharif', 'Rabi', 'Zaid'];

  const filteredCrops = useMemo(() => {
    return crops.filter((crop) => {
  
      const matchesSearch = crop.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());

      const matchesCategory =
        selectedCategory === 'All' || crop.category === selectedCategory;

      const matchesSeason =
        selectedSeason === 'All Seasons' || crop.season.toLowerCase().includes(selectedSeason.toLowerCase());

      return matchesSearch && matchesCategory && matchesSeason;
    });
  }, [searchQuery, selectedCategory, selectedSeason]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedSeason('All Seasons');
  };

  const isFiltered = searchQuery !== '' || selectedCategory !== 'All' || selectedSeason !== 'All Seasons';

  return (
    <div className="explore-crops-page page-wrapper">
      <div className="container">

        <header className="page-header explore-header text-center">
          <span className="badge page-badge">Agricultural Knowledge Base</span>
          <h1 className="page-title">Explore Crops</h1>
          <p className="page-description">
            Discover essential information about crops, their growing seasons, and cultivation requirements.
          </p>
        </header>

        <section className="card filter-card" aria-label="Crop search and filters">
     
          <div className="filter-top-row">
         
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
