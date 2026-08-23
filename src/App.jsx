import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Global Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Top-Level Page Components
import Home from './pages/Home';
import ExploreCrops from './pages/ExploreCrops';
import CropDetails from './pages/CropDetails';
import DiseaseDetection from './pages/DiseaseDetection';
import Weather from './pages/Weather';
import MarketPrices from './pages/MarketPrices';
import Dashboard from './pages/Dashboard';
import DashboardOverview from './pages/DashboardOverview';
import DashboardCrops from './pages/DashboardCrops';
import DashboardActivities from './pages/DashboardActivities';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

/**
 * App Root Component
 * 
 * Demonstrates the complete React Router v6 Routing Architecture:
 * 1. Standard Routes: Home (/), ExploreCrops (/crops), DiseaseDetection (/disease-detection), etc.
 * 2. Dynamic Route: /crops/:cropId with useParams()
 * 3. Nested Dashboard Routes: /dashboard with child routes (/dashboard/overview, /dashboard/crops, /dashboard/activities) and <Outlet />
 * 4. Catch-all 404 Route: path="*" for handling unknown URLs
 */
function App() {
  return (
    <div className="app-container">
      {/* Global Navigation Bar */}
      <Navbar />

      {/* Main Routing Area */}
      <main className="main-content">
        <Routes>
          {/* Top-Level Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/crops" element={<ExploreCrops />} />

          {/* Dynamic Route for Individual Crops */}
          <Route path="/crops/:cropId" element={<CropDetails />} />

          {/* Core Feature Pages */}
          <Route path="/disease-detection" element={<DiseaseDetection />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/market-prices" element={<MarketPrices />} />

          {/* Nested Dashboard Route Structure (Directly Accessible in Evaluation 1) */}
          <Route path="/dashboard" element={<Dashboard />}>
            {/* Default Index Route & Overview Child Route */}
            <Route index element={<DashboardOverview />} />
            <Route path="overview" element={<DashboardOverview />} />

            {/* Nested Child Route for Crops Management */}
            <Route path="crops" element={<DashboardCrops />} />

            {/* Nested Child Route for Upcoming Activities */}
            <Route path="activities" element={<DashboardActivities />} />
          </Route>

          {/* Informational & Support Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Authentication Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Catch-all 404 Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default App;
