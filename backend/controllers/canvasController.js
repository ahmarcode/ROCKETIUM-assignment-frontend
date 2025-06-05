const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

let canvasInstance = null;
let context = null;

let canvasHistory = [];
let redoStack = [];

const multer = require("multer");
const upload = multer({ dest: "uploads/" }); 

exports.initCanvas = (req, res) => {
  const { width, height } = req.body;
  if (!width || !height)
    return res.status(400).json({ error: "Width and height are required" });

  canvasInstance = createCanvas(width, height);
  context = canvasInstance.getContext("2d");

  context.fillStyle = "white";
  context.fillRect(0, 0, width, height);

  canvasHistory = [context.getImageData(0, 0, width, height)];
  redoStack = [];

  res.status(200).json({ message: "Canvas initialized", width, height });
};

exports.getCanvasImage = (req, res) => {
  if (!canvasInstance)
    return res.status(400).json({ message: "Canvas not initialized yet" });
  const buffer = canvasInstance.toBuffer("image/png");
  res.set("Content-Type", "image/png");
  res.send(buffer);
};

exports.uploadFileToCanvas = async (req, res) => {
  if (!canvasInstance || !context) {
    return res.status(400).json({ message: "Canvas not initialized yet" });
  }

  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const x = parseInt(req.body.x, 10);
  const y = parseInt(req.body.y, 10);
  const width = req.body.width ? parseInt(req.body.width, 10) : null;
  const height = req.body.height ? parseInt(req.body.height, 10) : null;

  if (isNaN(x) || isNaN(y)) {
    return res.status(400).json({ message: "Invalid or missing coordinates" });
  }

  try {
    const img = await loadImage(file.path);

    const drawWidth = width || img.width;
    const drawHeight = height || img.height;

    canvasHistory.push(
      context.getImageData(0, 0, canvasInstance.width, canvasInstance.height)
    );
    redoStack = [];

    context.drawImage(img, x, y, drawWidth, drawHeight);

    fs.unlink(file.path, (err) => {
      if (err) console.error("Failed to delete temp image:", err);
    });

    res.status(200).json({ message: "Uploaded image added to canvas" });
  } catch (error) {
    console.error("Error loading uploaded image:", error);
    res.status(500).json({
      message: "Failed to process uploaded image",
      error: error.message,
    });
  }
};

exports.addShape = (req, res) => {
  const { type, x, y, width, height, radius, color } = req.body;
  if (!canvasInstance || !context)
    return res.status(400).json({ message: "Canvas not initialized yet" });

  canvasHistory.push(
    context.getImageData(0, 0, canvasInstance.width, canvasInstance.height)
  );
  redoStack = [];

  context.fillStyle = color || "black";

  if (type === "rectangle") {
    if (!width || !height)
      return res
        .status(400)
        .json({ message: "Width and height are required for rectangle" });
    context.fillRect(x, y, width, height);
  } else if (type === "circle") {
    if (!radius)
      return res.status(400).json({ message: "Radius is required for circle" });
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  } else {
    return res.status(400).json({ message: "Unsupported shape type" });
  }

  res.json({ message: `${type} added to canvas` });
};

exports.addText = (req, res) => {
  const { text, font, x, y, fontSize, color } = req.body;
  if (!canvasInstance || !context)
    return res.status(400).json({ message: "Canvas not initialized yet" });
  if (!text || typeof x !== "number" || typeof y !== "number")
    return res
      .status(400)
      .json({ message: "Invalid or missing text/coordinates" });

  canvasHistory.push(
    context.getImageData(0, 0, canvasInstance.width, canvasInstance.height)
  );
  redoStack = [];

  context.fillStyle = color || "black";
  context.font = `${fontSize || "16px"} ${font || "Arial"}`;
  context.fillText(text, x, y);

  res.status(200).json({ message: "Text added to canvas" });
};

exports.addImage = async (req, res) => {
  if (!canvasInstance || !context)
    return res.status(400).json({ message: "Canvas not initialized yet" });

  const { imageUrl, x, y, width, height } = req.body;
  if (!imageUrl)
    return res.status(400).json({ message: "Image URL is required" });
  if (typeof x !== "number" || typeof y !== "number")
    return res.status(400).json({ message: "Invalid or missing coordinates" });

  try {
    const img = await loadImage(imageUrl);
    const drawWidth = width || img.width;
    const drawHeight = height || img.height;

    canvasHistory.push(
      context.getImageData(0, 0, canvasInstance.width, canvasInstance.height)
    );
    redoStack = [];

    context.drawImage(img, x, y, drawWidth, drawHeight);

    res.status(200).json({ message: "Image added to canvas" });
  } catch (error) {
    console.error("Error loading/drawing image:", error);
    res
      .status(500)
      .json({ message: "Failed to load or draw image", error: error.message });
  }
};

exports.exportToPDF = (req, res) => {
  if (!canvasInstance)
    return res.status(400).json({ message: "Canvas not initialized" });

  const imgBuffer = canvasInstance.toBuffer("image/png");
  const doc = new PDFDocument({ autoFirstPage: false });
  const tempPath = path.join(__dirname, "../temp/output.pdf");
  const stream = fs.createWriteStream(tempPath);

  doc.pipe(stream);

  doc.addPage({
    size: [canvasInstance.width, canvasInstance.height],
  });

  doc.image(imgBuffer, 0, 0, {
    width: canvasInstance.width,
    height: canvasInstance.height,
  });

  doc.end();

  stream.on("finish", () => {
    res.download(tempPath, "canvas-output.pdf", (err) => {
      if (err) {
        console.error("Error sending file:", err);
      }
      fs.unlink(tempPath, () => {});
    });
  });
};

exports.undoCanvas = (req, res) => {
  if (!canvasInstance || !context) {
    return res.status(400).json({ message: "Canvas not initialized yet" });
  }
  if (canvasHistory.length === 0) {
    return res.status(400).json({ message: "Nothing to undo" });
  }

  try {
    redoStack.push(
      context.getImageData(0, 0, canvasInstance.width, canvasInstance.height)
    );

    const lastState = canvasHistory.pop();
    context.putImageData(lastState, 0, 0);

    res.status(200).json({ message: "Undo successful" });
  } catch (err) {
    res.status(500).json({ message: "Undo failed", error: err.message });
  }
};

exports.redoCanvas = (req, res) => {
  if (!canvasInstance || !context) {
    return res.status(400).json({ message: "Canvas not initialized yet" });
  }
  if (redoStack.length === 0) {
    return res.status(400).json({ message: "Nothing to redo" });
  }

  try {
    canvasHistory.push(
      context.getImageData(0, 0, canvasInstance.width, canvasInstance.height)
    );

    const redoState = redoStack.pop();
    context.putImageData(redoState, 0, 0);

    res.status(200).json({ message: "Redo successful" });
  } catch (err) {
    res.status(500).json({ message: "Redo failed", error: err.message });
  }
};

exports.resetCanvas = (req, res) => {
  if (!canvasInstance || !context) {
    return res.status(400).json({ message: "Canvas not initialized yet" });
  }

  try {
    canvasHistory.push(
      context.getImageData(0, 0, canvasInstance.width, canvasInstance.height)
    );
    redoStack = [];

    context.clearRect(0, 0, canvasInstance.width, canvasInstance.height);

    res.status(200).json({ message: "Canvas reset successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to reset canvas", error: err.message });
  }
};
