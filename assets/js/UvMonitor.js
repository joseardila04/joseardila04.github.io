import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UvMonitor = () => {
  const [uvIndex, setUvIndex] = useState(null);
  const [alertMsg, setAlertMsg] = useState('');
  const [protection, setProtection] = useState('');
  const [skinType, setSkinType] = useState('');

  useEffect(() => {
    // 🔥 This is where you put your full API URL
    const apiURL = "https://api.openweathermap.org/data/2.5/uvi?lat=30.2672&lon=-97.7431&appid=f722d02c29f6bc6700fd55f48ab25379";

    const fetchUV = async () => {
      try {
        const response = await axios.get(apiURL);
        setUvIndex(response.data.value);
      } catch (error) {
        console.error("Error fetching UV index:", error);
      }
    };

    fetchUV();
  }, []); // Empty dependency array = runs once on page load

  const handleSkinChange = (e) => {
    const value = parseInt(e.target.value);
    setSkinType(value);

    const thresholds = { 1: 3, 2: 4, 3: 5, 4: 6, 5: 7, 6: 8 };
    const guidance = [
      "Minimal protection needed.",
      "Wear sunglasses, use SPF 30+ sunscreen.",
      "Use SPF 50+, seek shade.",
      "Avoid sun exposure, wear protective clothing.",
      "Avoid going outside, full protection required."
    ];

    const riskIndex = Math.min(Math.floor((uvIndex || 0) / 3), 4);

    if (uvIndex >= thresholds[value]) {
      setAlertMsg(`⚠️ UV Index ${uvIndex} is high for your skin type.`);
    } else {
      setAlertMsg("✅ UV Index is currently safe.");
    }

    setProtection(guidance[riskIndex]);
  };

  return (
    <section>
      <h2>Live UV Monitoring</h2>
      <h3>Current UV Index: {uvIndex !== null ? uvIndex : "Loading..."}</h3>
      <p>Protection Recommendation: {protection}</p>

      <div>
        <h4>Select Your Skin Type</h4>
        <select onChange={handleSkinChange}>
          <option value="">-- Choose --</option>
          <option value="1">Type I - Very Fair</option>
          <option value="2">Type II - Fair</option>
          <option value="3">Type III - Medium</option>
          <option value="4">Type IV - Olive</option>
          <option value="5">Type V - Brown</option>
          <option value="6">Type VI - Dark Brown</option>
        </select>
        <p>{alertMsg}</p>
      </div>
    </section>
  );
};

export default UvMonitor;
