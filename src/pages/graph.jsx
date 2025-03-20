import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchCropPriceByDay } from '../components/prices';

const RealTimeCropPriceGraph = () => {
  const [cropData, setCropData] = useState([]);
  const [labels, setLabels] = useState([]); // Days/Time
  const [prices, setPrices] = useState([]); // Prices per day
  const [loading, setLoading] = useState(true);
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      const startDate = '2024-09-01'; // Example start date
      const endDate = '2024-09-08';   // Example end date
      
      const data = await fetchCropPriceByDay(selectedCrop, startDate, endDate);
      
      if (data) {
        const priceData = data.map((item) => item.price);
        const dateLabels = data.map((item) => item.date);

        setPrices(priceData);
        setLabels(dateLabels);
      } else {
        setError('Failed to load data');
      }
      
      setLoading(false);
    };

    loadData();
  }, [selectedCrop]);

  const handleCropChange = (e) => {
    setSelectedCrop(e.target.value);
  };

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: `Price of ${selectedCrop} (Rs/Qtl)`,
        data: prices,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Price (Rs/Qtl)'
        }
      }
    }
  };

  return (
    <div>
      <h1>Real-time Crop Price Monitoring</h1>
      <label htmlFor="crop">Select Crop: </label>
      <select id="crop" onChange={handleCropChange}>
        <option value="Wheat">Wheat</option>
        <option value="Rice">Rice</option>
        <option value="Maize">Maize</option>
        {/* Add more crop options */}
      </select>

      {loading && <p>Loading data...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div>
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default RealTimeCropPriceGraph;
