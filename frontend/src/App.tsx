import { useState } from "react";
import InitCanvasForm from "./components/InitCanvasForm";
import CanvasBoard from "./components/CanvasBoard";
import CanvasControls from "./components/CanvasControls";
import ExportButton from "./components/ExportButton";

function App() {
  const [canvasReady, setCanvasReady] = useState(false);
  const [canvasData, setCanvasData] = useState({ width: 0, height: 0 });
  const [refreshTrigger, setRefreshTrigger] = useState(0); // trigger for re-fetching image

  const triggerRefresh = () => setRefreshTrigger((prev) => prev + 1);

  return (
    <>
      {!canvasReady ? (
        <InitCanvasForm
          setCanvasReady={setCanvasReady}
          setCanvasData={setCanvasData}
        />
      ) : (
        <div>
          <CanvasControls
            canvasData={canvasData}
            onUpdate={triggerRefresh} 
          />
          <CanvasBoard refreshTrigger={refreshTrigger} />
          <ExportButton />
        </div>
      )}
    </>
  );
}

export default App;
