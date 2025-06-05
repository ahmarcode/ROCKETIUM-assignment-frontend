import { useState } from "react";
import InitCanvasForm from "./components/InitCanvasForm";
import CanvasBoard from "./components/CanvasBoard";
import CanvasControls from "./components/CanvasControls";

function App() {
  const [canvasReady, setCanvasReady] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = () => setRefreshTrigger((prev) => prev + 1);

  return (
    <>
      {!canvasReady ? (
        <InitCanvasForm
          setCanvasReady={setCanvasReady}
          setCanvasData={() => {}}
        />
      ) : (
        <div>
          <CanvasControls onUpdate={triggerRefresh} />
          <CanvasBoard refreshTrigger={refreshTrigger} />
        </div>
      )}
    </>
  );
}

export default App;
