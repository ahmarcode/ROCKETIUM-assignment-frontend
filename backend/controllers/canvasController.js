const { createCanvas } = require("canvas");

let canvasInstance = null;
let context = null;

exports.initCanvas = (req, res) => {
  const { width, height } = req.body;
  if (!width || !height) {
    return res.status(400).json({ error: "Width and height are required" });
  }

  canvasInstance = createCanvas(width, height);
  context = canvasInstance.getContext("2d");

  context.fillStyle = "white";
  context.fillRect(0, 0, width, height);

  res.status(200).json({ message: "Canvas initialized", width, height });
};

exports.addShape = (req, res) => {
  const { type, x, y, width, height, radius, color } = req.body;

  if (!canvasInstance || !context) {
    return res.status(400).json({ message: "canvas not initialized yet" });
  }
  context.fillStyle = color || "black";
  if (type === "rectangle") {
    if (!width || !height) {
      return res
        .status(400)
        .json({ message: "Width and height are required for rectangle" });
    }
    context.fillRect(x, y, width, height);
  } else if (type === "circle") {
    if (!radius) {
      return res.status(400).json({ message: "Radius is required for circle" });
    }
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  } else {
    return res.status(400).json({ message: "Unsupported shape type" });
  }

  res.join({ message: `${type} added to canvas` });
};

exports.addText = (req, res) => {
  const { text, font, x, y, fontSize, color } = req.body;

  if (!canvasInstance || !context) {
    return res.status(400).json({ message: "canvas not initialized yet" });
  }
  if (!text || typeof x !== "number" || typeof y !== "number") {
    return res
      .status(400)
      .json({ message: "Invalid or missing text/coordinates" });
  }

  context.fillStyle = color || "black";
  context.font = `${fontSize || "16px"} ${font || "Arial"}`;
  context.fillText(text, x, y);
  res.status(200).json({ message: "Text added to canvas" });
};

exports.getCanvas = () => canvasInstance;
exports.getContext = () => context;
