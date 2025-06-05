import { useState } from "react";
import { addShapeToCanvas, addTextToCanvas } from "../api/canvas";

export default function CanvasControls({ canvasData, onUpdate }) {
  // States for shape inputs
  const [shapeType, setShapeType] = useState("rectangle");
  const [x, setX] = useState(10);
  const [y, setY] = useState(10);
  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(50);
  const [radius, setRadius] = useState(25);
  const [color, setColor] = useState("#000000");

  // States for text inputs
  const [text, setText] = useState("Hello");
  const [fontSize, setFontSize] = useState(20);

  // Handler to add shape
  const addShapeHandler = async (type) => {
    try {
      const result = await addShapeToCanvas(
        type,
        x,
        y,
        type === "rectangle" ? width : 0,
        type === "rectangle" ? height : 0,
        type === "circle" ? radius : 0,
        color
      );
      console.log("Shape added:", result);
      onUpdate(); 
    } catch (error) {
      console.error("Error adding shape:", error);
    }
  };

  // Handler to add text
  const addTextHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await addTextToCanvas(text, x, y, fontSize, color);
      console.log("Text added:", result);
      onUpdate(); 
    } catch (error) {
      console.error("Error adding text:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-200 rounded space-y-6">
      <h2 className="text-2xl font-bold mb-4">Canvas Toolbar</h2>

      <div className="flex flex-wrap gap-4 items-center">
        <label>
          Type:
          <select
            value={shapeType}
            onChange={(e) => setShapeType(e.target.value)}
            className="ml-2 border rounded px-2 py-1"
          >
            <option value="rectangle">Rectangle</option>
            <option value="circle">Circle</option>
          </select>
        </label>

        <label>
          X:
          <input
            type="number"
            value={x}
            onChange={(e) => setX(Number(e.target.value))}
            className="ml-1 border rounded px-2 py-1 w-16"
          />
        </label>

        <label>
          Y:
          <input
            type="number"
            value={y}
            onChange={(e) => setY(Number(e.target.value))}
            className="ml-1 border rounded px-2 py-1 w-16"
          />
        </label>

        {shapeType === "rectangle" && (
          <>
            <label>
              Width:
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="ml-1 border rounded px-2 py-1 w-16"
              />
            </label>
            <label>
              Height:
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="ml-1 border rounded px-2 py-1 w-16"
              />
            </label>
          </>
        )}

        {shapeType === "circle" && (
          <label>
            Radius:
            <input
              type="number"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="ml-1 border rounded px-2 py-1 w-16"
            />
          </label>
        )}

        <label>
          Color:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="ml-2"
          />
        </label>

        <button
          onClick={() => addShapeHandler(shapeType)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Shape
        </button>
      </div>

      <form
        onSubmit={addTextHandler}
        className="flex flex-wrap gap-4 items-center"
      >
        <label>
          Text:
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="ml-2 border rounded px-2 py-1"
          />
        </label>

        <label>
          X:
          <input
            type="number"
            value={x}
            onChange={(e) => setX(Number(e.target.value))}
            className="ml-1 border rounded px-2 py-1 w-16"
          />
        </label>

        <label>
          Y:
          <input
            type="number"
            value={y}
            onChange={(e) => setY(Number(e.target.value))}
            className="ml-1 border rounded px-2 py-1 w-16"
          />
        </label>

        <label>
          Font Size:
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="ml-1 border rounded px-2 py-1 w-16"
          />
        </label>

        <label>
          Color:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="ml-2"
          />
        </label>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Text
        </button>
      </form>
    </div>
  );
}
