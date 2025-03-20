import axios from 'axios';

const API_KEY = 'your_api_key'; // Replace with your actual API key
const BASE_URL = 'https://api.agmarknet.gov.in/v1/crop-prices';

export const fetchCropPriceByDay = async (cropName, startDate, endDate) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        crop: cropName,
        start_date: startDate,
        end_date: endDate,
        api_key: API_KEY,
      },
    });
    return response.data; // Assuming the API returns daily data
  } catch (error) {
    console.error('Error fetching crop prices:', error);
    return [];
  }
};
