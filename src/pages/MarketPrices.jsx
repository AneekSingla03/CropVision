import React, { useState, useMemo } from 'react';
import { marketPricesData, marketSummaryMetrics } from '../data/marketData';
import './MarketPrices.css';

/**
 * MarketPrices Page Component (Evaluation 1 Demo)
 * 
 * Demonstrates:
 * - useState: Managing searchQuery, selectedCategory, and selectedTrend
 * - useMemo: Performance-optimized filtering across crop names, markets, and categories
 * - Array.prototype.map(): Rendering dynamic financial-style commodity tables and responsive cards
 * - Conditional Rendering: Handling active filter state and empty search results
 */
function MarketPrices() {
  // 1. State for text search (matches crop name or mandi market location)
  const [searchQuery, setSearchQuery] = useState('');

  // 2. State for category filter
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 3. State for trend filter (All, Up, Down)
  const [selectedTrend, setSelectedTrend] = useState('All');

  // Filter Categories
  const categories = ['All', 'Cereals', 'Oilseeds', 'Cash Crops', 'Vegetables'];

  // 4. useMemo Hook: Calculates filtered commodity list
  const filteredMarkets = useMemo(() => {
    return marketPricesData.filter((item) => {
      // Search matching (crop name or market location)
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        item.crop.toLowerCase().includes(query) ||
        item.market.toLowerCase().includes(query) ||
        item.state.toLowerCase().includes(query);

      // Category matching
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      // Trend matching
      const matchesTrend =
        selectedTrend === 'All' ||
        (selectedTrend === 'up' && item.trend === 'up') ||
        (selectedTrend === 'down' && item.trend === 'down');

      return matchesSearch && matchesCategory && matchesTrend;
    });
  }, [searchQuery, selectedCategory, selectedTrend]);

  // Reset all active filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedTrend('All');
  };

  const isFiltered = searchQuery !== '' || selectedCategory !== 'All' || selectedTrend !== 'All';

  return (
    <div className="market-prices-page page-wrapper">
      <div className="container">
        {/* ===================================================================
            1. PAGE HEADER
            =================================================================== */}
        <header className="page-header market-header text-center">
          <span className="badge page-badge">Agricultural Economics</span>
          <h1 className="page-title">Market Prices</h1>
          <p className="page-description">
            Explore indicative crop prices and market trends across major agricultural mandis.
          </p>
        </header>

        {/* Prototype Disclaimer Notice Card */}
        <div className="market-disclaimer-card">
          <span className="disclaimer-icon">ℹ️</span>
          <p className="text-xs text-muted">
            <strong>Demonstration Prototype:</strong> Prices shown are demonstration data for the Evaluation 1 prototype. 
            Live APMC mandi API synchronization will be integrated in future phases.
          </p>
        </div>

        {/* ===================================================================
            2. MARKET SUMMARY HIGHLIGHT TILES
            =================================================================== */}
        <div className="market-metrics-grid">
          <div className="card market-summary-card">
            <span className="summary-label text-xs text-muted">Monitored Commodities</span>
            <h3 className="summary-value">{marketSummaryMetrics.totalCommodities}</h3>
            <span className="badge badge-neutral text-xs">Major APMC Mandis</span>
          </div>

          <div className="card market-summary-card">
            <span className="summary-label text-xs text-muted">Top Price Gainer</span>
            <h3 className="summary-value" style={{ color: 'var(--color-success)' }}>
              {marketSummaryMetrics.topGainer}
            </h3>
            <span className="badge badge-success text-xs">High Daily Demand</span>
          </div>

          <div className="card market-summary-card">
            <span className="summary-label text-xs text-muted">Average Market Movement</span>
            <h3 className="summary-value" style={{ color: 'var(--color-primary)' }}>
              {marketSummaryMetrics.averageGain}
            </h3>
            <span className="badge badge-success text-xs">Weekly Trajectory</span>
          </div>

          <div className="card market-summary-card">
            <span className="summary-label text-xs text-muted">Active Trade Hub</span>
            <h3 className="summary-value" style={{ fontSize: '1.25rem' }}>
              {marketSummaryMetrics.topActiveMandi}
            </h3>
            <span className="badge badge-neutral text-xs">High Daily Volume</span>
          </div>
        </div>

        {/* ===================================================================
            3. SEARCH & FILTER CONTROLS CARD
            =================================================================== */}
        <section className="card market-filter-card" aria-label="Market search and filters">
          <div className="filter-controls-row">
            {/* Search Input */}
            <div className="market-search-box">
              <span className="search-icon" role="img" aria-label="Search">🔍</span>
              <input
                type="text"
                className="form-input search-input"
                placeholder="Search by crop name or mandi location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Trend Quick Filter Buttons */}
            <div className="trend-filter-group">
              <button
                type="button"
                className={`trend-filter-btn ${selectedTrend === 'All' ? 'active' : ''}`}
                onClick={() => setSelectedTrend('All')}
              >
                All Trends
              </button>
              <button
                type="button"
                className={`trend-filter-btn ${selectedTrend === 'up' ? 'active-up' : ''}`}
                onClick={() => setSelectedTrend('up')}
              >
                ↑ Gainers
              </button>
              <button
                type="button"
                className={`trend-filter-btn ${selectedTrend === 'down' ? 'active-down' : ''}`}
                onClick={() => setSelectedTrend('down')}
              >
                ↓ Losers
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="market-category-row">
            <span className="category-label">Category:</span>
            <div className="category-pills-list">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            4. RESULTS META BAR
            =================================================================== */}
        <div className="results-meta-bar flex flex-between">
          <div className="results-count-text">
            <strong>Showing {filteredMarkets.length}</strong> Markets / Crops
          </div>

          {isFiltered && (
            <button
              type="button"
              className="btn btn-outline btn-sm clear-filters-link-btn"
              onClick={handleClearFilters}
            >
              Reset Filters ↺
            </button>
          )}
        </div>

        {/* ===================================================================
            5. MARKET COMMODITY DATA TABLE (Desktop & Tablet)
            =================================================================== */}
        {filteredMarkets.length > 0 ? (
          <>
            {/* Desktop / Tablet Table View */}
            <div className="card market-table-container">
              <table className="market-table">
                <thead>
                  <tr>
                    <th>Crop / Commodity</th>
                    <th>Mandi Market & State</th>
                    <th className="text-right">Price per Quintal</th>
                    <th className="text-center">24h Change</th>
                    <th className="text-center">Trend</th>
                    <th className="text-right">Govt. MSP</th>
                    <th className="text-right">Daily Arrival</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMarkets.map((item) => {
                    const isUp = item.trend === 'up';
                    const isDown = item.trend === 'down';

                    return (
                      <tr key={item.id} className="market-table-row">
                        {/* Crop Name & Variety */}
                        <td>
                          <div className="crop-td-cell">
                            <strong className="crop-td-name">{item.crop}</strong>
                            <span className="crop-td-variety text-xs text-muted">{item.variety}</span>
                          </div>
                        </td>

                        {/* Mandi & State */}
                        <td>
                          <div className="market-td-cell">
                            <span className="market-td-name">📍 {item.market}</span>
                            <span className="badge badge-neutral text-xs">{item.state}</span>
                          </div>
                        </td>

                        {/* Price per Quintal */}
                        <td className="text-right">
                          <strong className="price-td-val">{item.formattedPrice}</strong>
                          <span className="text-xs text-muted block">/{item.unit.replace('per ', '')}</span>
                        </td>

                        {/* Change Percentage */}
                        <td className="text-center">
                          <span
                            className={`change-badge ${
                              isUp ? 'change-up' : isDown ? 'change-down' : 'change-stable'
                            }`}
                          >
                            {item.changePercent}
                          </span>
                        </td>

                        {/* Trend Indicator */}
                        <td className="text-center">
                          <span
                            className={`trend-indicator-pill ${
                              isUp ? 'trend-up' : isDown ? 'trend-down' : 'trend-stable'
                            }`}
                          >
                            {item.trendLabel}
                          </span>
                        </td>

                        {/* Government MSP */}
                        <td className="text-right">
                          <span className="msp-td-val">{item.msp}</span>
                        </td>

                        {/* Daily Arrival Volume */}
                        <td className="text-right">
                          <span className="volume-td-val text-sm text-muted">{item.arrivalVolume}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Responsive Cards View */}
            <div className="market-mobile-cards-list">
              {filteredMarkets.map((item) => {
                const isUp = item.trend === 'up';
                const isDown = item.trend === 'down';

                return (
                  <div key={item.id} className="card market-mobile-card">
                    <div className="mobile-card-top flex flex-between">
                      <div>
                        <h3 className="mobile-crop-title">{item.crop}</h3>
                        <span className="text-xs text-muted">{item.variety}</span>
                      </div>
                      <span
                        className={`change-badge ${
                          isUp ? 'change-up' : isDown ? 'change-down' : 'change-stable'
                        }`}
                      >
                        {item.changePercent}
                      </span>
                    </div>

                    <div className="mobile-card-body">
                      <div className="mobile-metric-row flex flex-between">
                        <span className="text-sm text-muted">Mandi Location:</span>
                        <strong className="text-sm">📍 {item.market}</strong>
                      </div>

                      <div className="mobile-metric-row flex flex-between">
                        <span className="text-sm text-muted">Price per Quintal:</span>
                        <strong className="mobile-price-val">{item.formattedPrice}</strong>
                      </div>

                      <div className="mobile-metric-row flex flex-between">
                        <span className="text-sm text-muted">Trend Indicator:</span>
                        <span
                          className={`trend-indicator-pill ${
                            isUp ? 'trend-up' : isDown ? 'trend-down' : 'trend-stable'
                          }`}
                        >
                          {item.trendLabel}
                        </span>
                      </div>

                      <div className="mobile-metric-row flex flex-between">
                        <span className="text-sm text-muted">Govt. MSP Benchmark:</span>
                        <span className="text-sm">{item.msp}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* Empty State (Conditional Rendering) */
          <div className="card empty-market-card text-center">
            <span className="empty-market-icon" role="img" aria-label="No data">📊</span>
            <h3 className="empty-market-title">No market commodity prices found</h3>
            <p className="empty-market-desc text-muted">
              Try adjusting your search query or selecting a different category filter.
            </p>
            <button
              type="button"
              className="btn btn-primary"
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

export default MarketPrices;
