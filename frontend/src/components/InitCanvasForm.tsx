import { useState } from "react";
import { initializeCanvas } from "../api/canvas";

interface CanvasControlsProps {
  setCanvasData: (data: { width: number; height: number }) => void;
  setCanvasReady: (ready: boolean) => void;
}

export default function InitCanvasForm({setCanvasData, setCanvasReady}: CanvasControlsProps) {
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);


  const GenerateCanvasHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canvasWidth > 0 && canvasHeight > 0) {
      try {
        const result = await initializeCanvas(canvasWidth, canvasHeight);
        console.log("Canvas initialized:", result);
        setCanvasData({ width: result.width, height: result.height });
        setCanvasReady(true);
      } catch (error) {
        console.error("Error initializing canvas:", error);
      }
    } else {
      alert("Please enter valid dimensions for the canvas.");
    }
  };
  return (
    <>
        <form onSubmit={GenerateCanvasHandler} className="flex flex-col items-center  justify-center h-screen bg-gray-100">
          <div>
            <h2 className="text-4xl mb-8">Canvas Initialization Form</h2>
            <div className="flex gap-4 mb-4">
              <label>Enter Canvas Width (x-axis)</label>
              <input
                type="number"
                value={canvasWidth}
                onChange={(e) => setCanvasWidth(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1"
                placeholder="Enter width in pixels"
              />
            </div>
            <div className="flex gap-4 mb-4">
              <label>Enter Canvas Height (y-axis)</label>
              <input
                type="number"
                value={canvasHeight}
                onChange={(e) => setCanvasHeight(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1"
                placeholder="Enter height in pixels"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Generate Canvas
              </button>
            </div>
          </div>
        </form>
    </>
  );
}
