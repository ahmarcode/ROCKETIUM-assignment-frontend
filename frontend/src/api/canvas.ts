import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const initializeCanvas = async (width: number, height: number) => {
  const response = await axios.post(`${API_BASE_URL}/canvas/init`, { width, height });
  return response.data;
};

export const addShapeToCanvas = async (type: string, x: number, y: number, width: number, height: number, radius: number, color: string) => {
  const response = await axios.post(`${API_BASE_URL}/canvas/add-shape`, {
    type, x, y, width, height, radius, color
  });
  return response.data;
};

export const addTextToCanvas = async (text: string, x: number, y: number, fontSize: number, color: string) => {
  const response = await axios.post(`${API_BASE_URL}/canvas/add-text`, {
    text, x, y, fontSize, color
  });
  return response.data;
};

export async function fetchCanvasImage(): Promise<string | null> {
  const response = await axios.get(`${API_BASE_URL}/canvas/image`, {
    responseType: "blob",
  });
  return URL.createObjectURL(response.data);
}

export async function exportCanvasAsPDF(): Promise<void> {
  const response = await axios.get(`${API_BASE_URL}/canvas/export-pdf`, {
    responseType: "blob",
  });
  const blob = new Blob([response.data], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "canvas-export.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
