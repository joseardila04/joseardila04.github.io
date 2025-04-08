import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UvMonitor = () => {
  const [uvIndex, setUvIndex] = useState(null);
  const [skinType, setSkinType] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [protection, setProtection] = useState('');

  useEffect(() => {
    // Fetch live UV data
    const fetchUV = async () => {
      const API_KEY = "YOUR_API_KEY"; // <- replace this
      const lat = 30.2672; // Austin, TX
      const lon = -97.7431;

      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        setUvIndex(response.data.value);
      } catch (error) {
        console.error("Failed to fetch UV index", error);
      }
    };

    fetchUV();
  }, []);

  const handleSkinChange = (e) => {
    const value = parseInt(e.target.value);
    setSkinType(value);

    const thresholds = { 1: 3, 2: 4, 3: 5, 4: 6, 5: 7, 6: 8 };
    const guidance = [
      "Minimal protection needed.",
      "Wear sunglasses, use SPF 30+ sunscreen.",
      "Use SPF 50+, seek shade.",
      "Avoid sun, wear protective clothes.",
      "Stay indoors, full protection required."
    ];
    const riskIndex = Math.min(Math.floor((uvIndex || 0) / 3), 4);

    if (uvIndex >= thresholds[value]) {
      setAlertMsg(`⚠️ Alert: UV Index ${uvIndex} is high for your skin type.`);
    } else {
      setAlertMsg(`✅ UV Index is safe for short exposure.`);
    }

    setProtection(guidance[riskIndex]);
  };

  return (
    <section>
      <h2>Live UV Monitoring</h2>
      <div className="monitor-columns">
        <div className="left-column">
          <h3>Current UV Index: {uvIndex !== null ? uvIndex : "Loading..."}</h3>
          <p>Recommended Protection: {protection}</p>
          <p>Location: Austin, Texas</p>
        </div>
        <div className="right-column">
          <h3>Personalized Alerts</h3>
          <p>{alertMsg}</p>
          <select onChange={handleSkinChange}>
            <option value="">-- Select Your Skin Type --</option>
            <option value="1">Type I - Very Fair</option>
            <option value="2">Type II - Fair</option>
            <option value="3">Type III - Medium</option>
            <option value="4">Type IV - Olive</option>
            <option value="5">Type V - Brown</option>
            <option value="6">Type VI - Dark Brown</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default UvMonitor;
