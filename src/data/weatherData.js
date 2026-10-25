export const regionalWeatherData = {
  punjab: {
    id: 'punjab',
    regionName: 'Punjab, India',
    subDistrict: 'Ludhiana Agricultural Belt',
    lastUpdated: 'Updated today at 09:00 AM',
    current: {
      temperature: '28°C',
      condition: 'Partly Cloudy',
      icon: '⛅',
      humidity: '62%',
      windSpeed: '14 km/h',
      rainChance: '15%',
      feelsLike: '29°C',
      highTemp: '31°C',
      lowTemp: '20°C',
      soilMoisture: '48% (Optimal)',
      uvIndex: '6 (Moderate)',
      airQuality: 'Good (AQI 58)',
      dewPoint: '18°C',
    },
    forecast5Day: [
      {
        id: 'day-1',
        day: 'Today',
        icon: '⛅',
        condition: 'Partly Cloudy',
        high: '28°C',
        low: '20°C',
        rainChance: '15%',
      },
      {
        id: 'day-2',
        day: 'Tomorrow',
        icon: '☀️',
        condition: 'Sunny & Clear',
        high: '29°C',
        low: '21°C',
        rainChance: '10%',
      },
      {
        id: 'day-3',
        day: 'Friday',
        icon: '🌦️',
        condition: 'Scattered Showers',
        high: '27°C',
        low: '19°C',
        rainChance: '65%',
      },
      {
        id: 'day-4',
        day: 'Saturday',
        icon: '🌧️',
        condition: 'Moderate Rain',
        high: '25°C',
        low: '18°C',
        rainChance: '80%',
      },
      {
        id: 'day-5',
        day: 'Sunday',
        icon: '⛅',
        condition: 'Partly Cloudy',
        high: '26°C',
        low: '19°C',
        rainChance: '25%',
      },
    ],
    farmingInsight: {
      summary: 'Moderate temperatures and low rainfall probability make today suitable for routine field activities.',
      cropStatus: 'Favorable for active vegetative growth in Wheat and Mustard fields.',
      advisories: [
        {
          id: 'adv-irrigation',
          category: 'Irrigation Advisory',
          icon: '💧',
          status: 'Light Watering Suitable',
          description: 'Proceed with scheduled light morning irrigation. Avoid heavy flooding as rain is forecast on Friday.',
        },
        {
          id: 'adv-spraying',
          category: 'Pesticide & Foliar Spray',
          icon: '🧪',
          status: 'Favorable Window',
          description: 'Current wind speeds (14 km/h) are within safe thresholds for applying bio-fungicides and foliar micronutrients.',
        },
        {
          id: 'adv-harvesting',
          category: 'Harvesting & Storage',
          icon: '🚜',
          status: 'Dry Window',
          description: 'Ensure harvested grains and fodder are stored in covered sheds before anticipated weekend precipitation.',
        },
        {
          id: 'adv-soil',
          category: 'Tillage & Sowing',
          icon: '🌱',
          status: 'Good Ground Condition',
          description: 'Soil moisture levels (48%) provide optimal conditions for harrowing and seedbed preparation.',
        },
      ],
    },
  },

  haryana: {
    id: 'haryana',
    regionName: 'Haryana, India',
    subDistrict: 'Karnal Farming Zone',
    lastUpdated: 'Updated today at 09:00 AM',
    current: {
      temperature: '29°C',
      condition: 'Clear Sky / Sunny',
      icon: '☀️',
      humidity: '55%',
      windSpeed: '12 km/h',
      rainChance: '10%',
      feelsLike: '30°C',
      highTemp: '32°C',
      lowTemp: '21°C',
      soilMoisture: '42% (Moderate)',
      uvIndex: '7 (High)',
      airQuality: 'Moderate (AQI 72)',
      dewPoint: '17°C',
    },
    forecast5Day: [
      { id: 'h-1', day: 'Today', icon: '☀️', condition: 'Sunny', high: '29°C', low: '21°C', rainChance: '10%' },
      { id: 'h-2', day: 'Tomorrow', icon: '☀️', condition: 'Clear', high: '31°C', low: '22°C', rainChance: '5%' },
      { id: 'h-3', day: 'Friday', icon: '⛅', condition: 'Partly Cloudy', high: '28°C', low: '20°C', rainChance: '35%' },
      { id: 'h-4', day: 'Saturday', icon: '🌦️', condition: 'Light Showers', high: '26°C', low: '19°C', rainChance: '60%' },
      { id: 'h-5', day: 'Sunday', icon: '☀️', condition: 'Sunny', high: '28°C', low: '20°C', rainChance: '15%' },
    ],
    farmingInsight: {
      summary: 'Dry and sunny conditions provide an ideal window for weed management and tractor cultivation.',
      cropStatus: 'Healthy development across pulses, wheat, and sugarcane acreage.',
      advisories: [
        {
          id: 'h-adv-1',
          category: 'Irrigation Advisory',
          icon: '💧',
          status: 'Recommended',
          description: 'Provide standard canal/tube-well irrigation to maintain root-zone moisture.',
        },
        {
          id: 'h-adv-2',
          category: 'Pesticide & Spray',
          icon: '🧪',
          status: 'Optimal',
          description: 'Clear sunny sky allows optimal systemic pesticide absorption without wash-off risk.',
        },
      ],
    },
  },

  maharashtra: {
    id: 'maharashtra',
    regionName: 'Maharashtra, India',
    subDistrict: 'Nashik Agro-Climatic Zone',
    lastUpdated: 'Updated today at 09:00 AM',
    current: {
      temperature: '27°C',
      condition: 'Pleasant & Breezy',
      icon: '⛅',
      humidity: '58%',
      windSpeed: '16 km/h',
      rainChance: '20%',
      feelsLike: '28°C',
      highTemp: '30°C',
      lowTemp: '19°C',
      soilMoisture: '50% (Good)',
      uvIndex: '6 (Moderate)',
      airQuality: 'Good (AQI 45)',
      dewPoint: '16°C',
    },
    forecast5Day: [
      { id: 'm-1', day: 'Today', icon: '⛅', condition: 'Partly Cloudy', high: '27°C', low: '19°C', rainChance: '20%' },
      { id: 'm-2', day: 'Tomorrow', icon: '⛅', condition: 'Passing Clouds', high: '28°C', low: '20°C', rainChance: '25%' },
      { id: 'm-3', day: 'Friday', icon: '☀️', condition: 'Sunny', high: '29°C', low: '21°C', rainChance: '15%' },
      { id: 'm-4', day: 'Saturday', icon: '☀️', condition: 'Clear', high: '30°C', low: '20°C', rainChance: '10%' },
      { id: 'm-5', day: 'Sunday', icon: '⛅', condition: 'Partly Cloudy', high: '28°C', low: '19°C', rainChance: '20%' },
    ],
    farmingInsight: {
      summary: 'Favorable climate for horticultural crops, onion curing, and cotton field maintenance.',
      cropStatus: 'Strong vegetative vigor observed in vineyards and onion nurseries.',
      advisories: [
        {
          id: 'm-adv-1',
          category: 'Irrigation Advisory',
          icon: '💧',
          status: 'Drip Irrigation Recommended',
          description: 'Regulate drip irrigation to avoid over-saturation around root zones.',
        },
        {
          id: 'm-adv-2',
          category: 'Crop Protection',
          icon: '🛡️',
          status: 'Monitor Powdery Mildew',
          description: 'Mild temperatures and morning dew warrant preventive sulfur dusting on sensitive foliage.',
        },
      ],
    },
  },
};

export const REGION_COORDINATES = {
  punjab: {
    id: 'punjab',
    name: 'Punjab (Ludhiana Belt)',
    regionName: 'Punjab, India',
    subDistrict: 'Ludhiana Agricultural Belt',
    lat: 30.9010,
    lon: 75.8573,
    timezone: 'Asia/Kolkata',
  },
  haryana: {
    id: 'haryana',
    name: 'Haryana (Karnal Zone)',
    regionName: 'Haryana, India',
    subDistrict: 'Karnal Farming Zone',
    lat: 29.6857,
    lon: 76.9905,
    timezone: 'Asia/Kolkata',
  },
  maharashtra: {
    id: 'maharashtra',
    name: 'Maharashtra (Nashik Zone)',
    regionName: 'Maharashtra, India',
    subDistrict: 'Nashik Horticultural District',
    lat: 19.9975,
    lon: 73.7898,
    timezone: 'Asia/Kolkata',
  },
};

/**
 * Maps WMO Weather Interpretation Codes (WW) returned by Open-Meteo
 * to human-readable condition text and semantic emoji icons.
 */
export function getWmoWeatherDetails(code, isDay = 1) {
  const numericCode = Number(code);
  switch (numericCode) {
    case 0:
      return {
        condition: isDay ? 'Clear Sky' : 'Clear Sky (Night)',
        icon: isDay ? '☀️' : '🌙',
      };
    case 1:
      return {
        condition: 'Mainly Clear',
        icon: isDay ? '🌤️' : '🌙',
      };
    case 2:
      return {
        condition: 'Partly Cloudy',
        icon: '⛅',
      };
    case 3:
      return {
        condition: 'Overcast',
        icon: '☁️',
      };
    case 45:
      return {
        condition: 'Foggy',
        icon: '🌫️',
      };
    case 48:
      return {
        condition: 'Depositing Rime Fog',
        icon: '🌫️',
      };
    case 51:
      return {
        condition: 'Light Drizzle',
        icon: '🌦️',
      };
    case 53:
      return {
        condition: 'Moderate Drizzle',
        icon: '🌦️',
      };
    case 55:
      return {
        condition: 'Dense Drizzle',
        icon: '🌧️',
      };
    case 56:
    case 57:
      return {
        condition: 'Freezing Drizzle',
        icon: '🌨️',
      };
    case 61:
      return {
        condition: 'Slight Rain',
        icon: '🌦️',
      };
    case 63:
      return {
        condition: 'Moderate Rain',
        icon: '🌧️',
      };
    case 65:
      return {
        condition: 'Heavy Rain',
        icon: '🌧️',
      };
    case 66:
    case 67:
      return {
        condition: 'Freezing Rain',
        icon: '🌨️',
      };
    case 71:
      return {
        condition: 'Slight Snowfall',
        icon: '🌨️',
      };
    case 73:
      return {
        condition: 'Moderate Snowfall',
        icon: '❄️',
      };
    case 75:
      return {
        condition: 'Heavy Snowfall',
        icon: '❄️',
      };
    case 77:
      return {
        condition: 'Snow Grains',
        icon: '🌨️',
      };
    case 80:
      return {
        condition: 'Slight Rain Showers',
        icon: '🌦️',
      };
    case 81:
      return {
        condition: 'Moderate Rain Showers',
        icon: '🌧️',
      };
    case 82:
      return {
        condition: 'Violent Rain Showers',
        icon: '⛈️',
      };
    case 85:
    case 86:
      return {
        condition: 'Snow Showers',
        icon: '❄️',
      };
    case 95:
      return {
        condition: 'Thunderstorm',
        icon: '⛈️',
      };
    case 96:
    case 99:
      return {
        condition: 'Severe Thunderstorm with Hail',
        icon: '⛈️',
      };
    default:
      return {
        condition: 'Variable Weather',
        icon: '🌤️',
      };
  }
}
