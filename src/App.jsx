import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

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

function App() {
  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/crops" element={<ExploreCrops />} />

          <Route path="/crops/:cropId" element={<CropDetails />} />

          <Route path="/disease-detection" element={<DiseaseDetection />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/market-prices" element={<MarketPrices />} />

          <Route path="/dashboard" element={<Dashboard />}>
          
            <Route index element={<DashboardOverview />} />
            <Route path="overview" element={<DashboardOverview />} />

            <Route path="crops" element={<DashboardCrops />} />

            <Route path="activities" element={<DashboardActivities />} />
          </Route>

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
