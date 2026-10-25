import React, { useState, useMemo, useEffect } from 'react';
import CropCard from '../components/CropCard';
import { crops } from '../data/crops';
import { useSavedCrops } from '../context/SavedCropsContext';
import { useDebounce } from '../hooks/useDebounce';
import './ExploreCrops.css';

const ITEMS_PER_PAGE = 6;

function ExploreCrops() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSeason, setSelectedSeason] = useState('All Seasons');
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);

  // Global saved-crops count from context
  const { savedCropIds } = useSavedCrops();

  const categories = ['All', 'Cereals', 'Pulses', 'Oilseeds', 'Cash Crops', 'Vegetables'];
  const seasons = ['All Seasons', 'Kharif', 'Rabi', 'Zaid'];

  // 1. Filter and sort matching crops
  const filteredCrops = useMemo(() => {
    // 1. Text search on debounced query + category & season filters
    const result = crops.filter((crop) => {
      const matchesSearch = crop.name
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase().trim());

      const matchesCategory =
        selectedCategory === 'All' || crop.category === selectedCategory;

      const matchesSeason =
        selectedSeason === 'All Seasons' ||
        crop.season.toLowerCase().includes(selectedSeason.toLowerCase());

      return matchesSearch && matchesCategory && matchesSeason;
    });

    // 2. Sort without mutating original array
    if (sortBy === 'name-asc') {
      return [...result].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortBy === 'name-desc') {
      return [...result].sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [debouncedSearchQuery, selectedCategory, selectedSeason, sortBy]);

  // Calculate total pages based on filtered results
  const totalPages = Math.max(1, Math.ceil(filteredCrops.length / ITEMS_PER_PAGE));

  // Reset to page 1 whenever debounced search query, category, season, or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, selectedCategory, selectedSeason, sortBy]);

  // When result count changes, ensure currentPage never exceeds totalPages
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Paginated slice for current page
  const paginatedCrops = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCrops.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCrops, currentPage]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedSeason('All Seasons');
    setSortBy('default');
    setCurrentPage(1);
  };

  const isFiltered =
    searchQuery !== '' ||
    selectedCategory !== 'All' ||
    selectedSeason !== 'All Seasons' ||
    sortBy !== 'default';

  return (
    <div className="explore-crops-page page-wrapper">
      <div className="container">
        {/* Header */}
        <header className="page-header explore-header text-center">
          <span className="badge page-badge">Agricultural Knowledge Base</span>
          <h1 className="page-title">Explore Crops</h1>
          <p className="page-description">
            Discover essential information about crops, their growing seasons, and cultivation requirements.
          </p>
        </header>

        {/* Filter Controls Card */}
        <section className="card filter-card" aria-label="Crop search and filters">
          <div className="filter-top-row">
            {/* Search Input with Debounce */}
            <div className="search-box-wrapper">
              <span className="search-icon" role="img" aria-label="Search">🔍</span>
              <input
                type="text"
                className="form-input search-input"
                placeholder="Search crops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search crops by name"
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

            {/* Season Filter */}
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

            {/* Sorting Control */}
            <div className="sort-select-wrapper">
              <label htmlFor="crop-sort-select" className="sort-label">
                Sort:
              </label>
              <select
                id="crop-sort-select"
                className="form-select sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Default Order</option>
                <option value="name-asc">Crop Name: A–Z</option>
                <option value="name-desc">Crop Name: Z–A</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
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

        {/* Results Meta Bar */}
        <div className="results-meta-bar flex flex-between">
          <div className="results-count-text">
            <strong>
              Showing {filteredCrops.length > 0
                ? `${(currentPage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(currentPage * ITEMS_PER_PAGE, filteredCrops.length)}`
                : '0'}
            </strong>{' '}
            of {filteredCrops.length} matching crops ({crops.length} total)
          </div>

          {/* Saved crops count — global state from context */}
          {savedCropIds.length > 0 && (
            <span className="saved-crops-badge">
              🌿 {savedCropIds.length} crop{savedCropIds.length > 1 ? 's' : ''} saved
            </span>
          )}

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

        {/* Crops Grid or Empty State */}
        {filteredCrops.length > 0 ? (
          <>
            <div className="crops-grid">
              {paginatedCrops.map((crop) => (
                <CropCard key={crop.id} crop={crop} />
              ))}
            </div>

            {/* Pagination Navigation */}
            <nav className="pagination-nav card flex flex-between align-center" aria-label="Crops pagination navigation">
              <div className="pagination-info text-sm text-muted">
                Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> ({filteredCrops.length} crops found)
              </div>

              <div className="pagination-controls flex align-center gap-xs">
                <button
                  type="button"
                  className="btn btn-outline btn-sm pagination-nav-btn prev-btn"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  ← Previous
                </button>

                <div className="pagination-numbers flex gap-xs" role="group" aria-label="Page numbers">
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      className={`pagination-number-btn ${pageNum === currentPage ? 'active' : ''}`}
                      onClick={() => setCurrentPage(pageNum)}
                      aria-label={`Go to page ${pageNum}`}
                      aria-current={pageNum === currentPage ? 'page' : undefined}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="btn btn-outline btn-sm pagination-nav-btn next-btn"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  Next →
                </button>
              </div>
            </nav>
          </>
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
