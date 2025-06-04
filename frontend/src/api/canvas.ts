import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const initializeCanvas = async (width: number, height: number) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/canvas/init`, {
      width,
      height,
    });
    return response.data;
  } catch (error) {
    console.error('Error initializing canvas:', error);
    throw error;
  }
}