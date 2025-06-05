import { useState } from "react";
import {
  addShapeToCanvas,
  addTextToCanvas,
  addImageToCanvas,
  redoCanvas,
  undoCanvas,
  uploadImageToCanvas,
  clearCanvas,
} from "../api/canvas";
import ExportButton from "./ExportButton";

export default function CanvasControls({ canvasData, onUpdate }) {
  const [shapeType, setShapeType] = useState("rectangle");
  const [x, setX] = useState(10);
  const [y, setY] = useState(10);
  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(50);
  const [radius, setRadius] = useState(25);
  const [color, setColor] = useState("#000000");

  const [text, setText] = useState("Hello");
  const [fontSize, setFontSize] = useState(20);

  const [imageUrl, setImageUrl] = useState("");
  const [imgWidth, setImgWidth] = useState(100);
  const [imgHeight, setImgHeight] = useState(100);

  const [uploadFile, setUploadFile] = useState(null);
  const [uploadX, setUploadX] = useState(10);
  const [uploadY, setUploadY] = useState(10);
  const [uploadWidth, setUploadWidth] = useState(100);
  const [uploadHeight, setUploadHeight] = useState(100);

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

  const addImageHandler = async (e) => {
    e.preventDefault();
    if (!imageUrl) return alert("Please enter an image URL");
    try {
      const result = await addImageToCanvas(
        imageUrl,
        x,
        y,
        imgWidth,
        imgHeight
      );
      console.log("Image added:", result);
      onUpdate();
    } catch (error) {
      console.error("Error adding image:", error);
    }
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();
    if (!uploadFile) return alert("Please select a file to upload");

    try {
      const result = await uploadImageToCanvas(
        uploadFile,
        uploadX,
        uploadY,
        uploadWidth,
        uploadHeight
      );
      console.log("Image uploaded:", result);
      onUpdate();
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-200 rounded space-y-6">
      <h2 className="text-2xl font-bold mb-4">Canvas Toolbar</h2>

      {/* Shape Controls */}
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

      {/* Text Controls */}
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

      {/* Image by URL Controls */}
      <form
        onSubmit={addImageHandler}
        className="flex flex-wrap gap-4 items-center"
      >
        <label>
          Image URL:
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="ml-2 border rounded px-2 py-1 w-64"
            placeholder="https://example.com/image.png"
          />
        </label>

        <label>
          Width:
          <input
            type="number"
            value={imgWidth}
            onChange={(e) => setImgWidth(Number(e.target.value))}
            className="ml-1 border rounded px-2 py-1 w-16"
          />
        </label>

        <label>
          Height:
          <input
            type="number"
            value={imgHeight}
            onChange={(e) => setImgHeight(Number(e.target.value))}
            className="ml-1 border rounded px-2 py-1 w-16"
          />
        </label>

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Add Image
        </button>
      </form>

      {/* Upload Image from File */}
      <form
        onSubmit={handleUploadImage}
        className="flex flex-wrap gap-4 items-center"
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
          required
        />

        <label>
          X:
          <input
            type="number"
            value={uploadX}
            onChange={(e) => setUploadX(Number(e.target.value))}
            className="ml-1 border rounded px-2 py-1 w-16"
          />
        </label>

        <label>
          Y:
          <input
            type="number"
            value={uploadY}
            onChange={(e) => setUploadY(Number(e.target.value))}
            className="ml-1 border rounded px-2 py-1 w-16"
          />
        </label>

        <label>
          Width:
          <input
            type="number"
            value={uploadWidth}
            onChange={(e) => setUploadWidth(Number(e.target.value))}
            className="ml-1 border rounded px-2 py-1 w-16"
          />
        </label>

        <label>
          Height:
          <input
            type="number"
            value={uploadHeight}
            onChange={(e) => setUploadHeight(Number(e.target.value))}
            className="ml-1 border rounded px-2 py-1 w-16"
          />
        </label>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Upload Image
        </button>
      </form>

      <div className="flex gap-4">
        <button
          onClick={async (e) => {
            e.preventDefault();
            try {
              await undoCanvas();
              onUpdate();
            } catch (err) {
              console.error("Undo failed:", err);
            }
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Undo
        </button>

        <button
          onClick={async (e) => {
            e.preventDefault();
            try {
              await redoCanvas();
              onUpdate();
            } catch (err) {
              console.error("Redo failed:", err);
            }
          }}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Redo
        </button>

        <button
          onClick={async (e) => {
            e.preventDefault();
            try {
              await clearCanvas();
              onUpdate();
            } catch (err) {
              console.error("Reset failed:", err);
            }
          }}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Reset Canvas
        </button>
      </div>
      <ExportButton />
    </div>
  );
}
