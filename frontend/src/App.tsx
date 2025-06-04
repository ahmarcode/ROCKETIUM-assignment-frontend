import { useState } from "react";
import "./App.css";
import InitCanvasForm from "./components/InitCanvasForm";

function App() {
  const [canvasReady, setCanvasReady] = useState(false);
  const [canvasData, setCanvasData] = useState({ width: 0, height: 0 });
  return (
    <>
      {!canvasReady ? (
        <InitCanvasForm
          setCanvasReady={setCanvasReady}
          setCanvasData={setCanvasData}
        />
      ) : (
        <div>
          <h2 className="text-4xl mb-8">Canvas Initialized</h2>
          <canvas
            width={canvasData.width}
            height={canvasData.height}
            className="border border-gray-300"
          ></canvas>
        </div>
      )}
    </>
  );
}

export default App;
