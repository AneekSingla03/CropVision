/**
 * homeData.js
 * 
 * Static demonstration data for the CropVision Home page sections:
 * - Statistics
 * - Core Features (6 features)
 * - How It Works (4 steps)
 * - Why CropVision (4 benefits)
 * - Dashboard Preview mock metrics
 */

// 1. Statistics Data
export const statisticsData = [
  {
    id: 'stat-crops',
    value: '12+',
    label: 'Crops Cataloged',
    description: 'Detailed agronomic guides & soil parameters',
    icon: '🌾',
  },
  {
    id: 'stat-tools',
    value: '5+',
    label: 'Smart Farming Tools',
    description: 'Disease scan, price tracker & calculators',
    icon: '🛠️',
  },
  {
    id: 'stat-weather',
    value: '24/7',
    label: 'Weather Insights',
    description: 'Real-time rainfall & climate forecasting',
    icon: '⛅',
  },
  {
    id: 'stat-resources',
    value: '100%',
    label: 'Farming Resources',
    description: 'Free accessible guides for every grower',
    icon: '📚',
  },
];

// 2. Core Features Data (6 Features)
export const coreFeaturesData = [
  {
    id: 'feat-crop-info',
    title: 'Crop Information',
    tag: 'Agronomic Library',
    description: 'Explore comprehensive profiles for cereals, pulses, cash crops, and horticulture with soil, watering, and temperature guidelines.',
    icon: '🌱',
    link: '/crops',
    actionText: 'Browse Crops',
  },
  {
    id: 'feat-disease-detection',
    title: 'Disease Detection',
    tag: 'AI Diagnostic Interface',
    description: 'Upload leaf imagery to detect early signs of fungal, bacterial, or viral infections and view organic & chemical remedy steps.',
    icon: '🔬',
    link: '/disease-detection',
    actionText: 'Diagnose Leaf',
  },
  {
    id: 'feat-weather',
    title: 'Weather Intelligence',
    tag: 'Climate Forecasts',
    description: 'Stay ahead of sudden weather shifts with precipitation probability, humidity levels, temperature trends, and seasonal advisories.',
    icon: '⛅',
    link: '/weather',
    actionText: 'Check Forecast',
  },
  {
    id: 'feat-market-prices',
    title: 'Market Prices',
    tag: 'Live Mandi Rates',
    description: 'Monitor real-time agricultural mandi commodity rates, state-wise price comparisons, and minimum support price (MSP) benchmarks.',
    icon: '📈',
    link: '/market-prices',
    actionText: 'View Prices',
  },
  {
    id: 'feat-calendar',
    title: 'Crop Calendar',
    tag: 'Seasonal Planning',
    description: 'Follow precise sowing, weeding, fertilizing, and harvesting timelines tailored to Rabi, Kharif, and Zaid agricultural seasons.',
    icon: '📅',
    link: '/crops',
    actionText: 'View Schedule',
  },
  {
    id: 'feat-calculator',
    title: 'Profit Calculator',
    tag: 'Farm Economics',
    description: 'Estimate expected farm output, input expenditure (seeds, fertilizer, water), and projected harvest revenue based on prevailing rates.',
    icon: '🧮',
    link: '/dashboard',
    actionText: 'Calculate Returns',
  },
];

// 3. How It Works (4 Steps)
export const howItWorksSteps = [
  {
    stepNumber: '01',
    title: 'Explore Your Crop',
    description: 'Select your target crop from our catalog to review optimal soil types, sowing seasons, and watering requirements.',
    icon: '🔍',
  },
  {
    stepNumber: '02',
    title: 'Understand Conditions',
    description: 'Analyze local weather patterns, soil pH tolerance, and regional climate suitability before planting.',
    icon: '🌦️',
  },
  {
    stepNumber: '03',
    title: 'Monitor and Plan',
    description: 'Use the disease scanner to safeguard foliage and track stage-by-stage growth according to the seasonal calendar.',
    icon: '📊',
  },
  {
    stepNumber: '04',
    title: 'Make Better Decisions',
    description: 'Leverage transparent mandi price trends to sell produce at peak profitability and minimize post-harvest loss.',
    icon: '🎯',
  },
];

// 4. Why CropVision (4 Key Benefits)
export const whyChooseUsBenefits = [
  {
    id: 'why-all-in-one',
    title: 'All-in-One Platform',
    description: 'No more switching between weather apps, government price bulletins, and farming books. Everything is unified in one clean dashboard.',
    icon: '🌐',
    badge: 'Unified',
  },
  {
    id: 'why-easy-info',
    title: 'Easy-to-Understand Information',
    description: 'Complex agronomic science and meteorological data are translated into clear, actionable advice that any farmer can apply right away.',
    icon: '💡',
    badge: 'Accessible',
  },
  {
    id: 'why-data-driven',
    title: 'Data-Driven Decisions',
    description: 'Replace guesswork with empirical benchmarks—from soil moisture thresholds to live market rate comparisons across nearby mandis.',
    icon: '📈',
    badge: 'Reliable',
  },
  {
    id: 'why-smart-farming',
    title: 'Smart Farming Approach',
    description: 'Adopt sustainable precision agriculture practices that maximize crop yield while conserving water and reducing pesticide overhead.',
    icon: '🚜',
    badge: 'Sustainable',
  },
];

// 5. Dashboard Preview Demo Metrics
export const dashboardPreviewData = {
  farmerName: 'Ramesh Patel',
  location: 'Ludhiana, Punjab',
  lastUpdated: 'Today at 08:30 AM',
  cropHealth: {
    status: 'Optimal Condition',
    score: '94%',
    monitoredFields: '4 Plots (Wheat & Mustard)',
    indicator: 'success',
  },
  weatherAlert: {
    temperature: '26°C',
    condition: 'Clear Sky / Sunny',
    humidity: '58%',
    rainForecast: 'Light shower predicted in 48 hrs',
    indicator: 'warning',
  },
  marketPriceSummary: {
    crop: 'Wheat (Sharbati Grade-A)',
    currentRate: '₹2,275 / Quintal',
    change: '+3.4% this week',
    trend: 'Rising demand in local mandi',
    indicator: 'success',
  },
  upcomingActivity: {
    title: 'Second Irrigation Cycle',
    scheduledDate: 'Tomorrow, 06:00 AM',
    field: 'Plot B - North Acre',
    recommendedWater: '50 mm depth',
  },
};
