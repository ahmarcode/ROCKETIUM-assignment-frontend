const express = require("express");
const router = express.Router();
const canvasController = require("../controllers/canvasController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/init", canvasController.initCanvas);
router.post("/add-shape", canvasController.addShape);
router.post("/add-text", canvasController.addText);
router.get("/image", canvasController.getCanvasImage);
router.get("/export-pdf", canvasController.exportToPDF);
router.post("/add-image", canvasController.addImage);
router.post("/undo", canvasController.undoCanvas);
router.post("/redo", canvasController.redoCanvas);
router.post("/upload-image", upload.single("file"), canvasController.uploadFileToCanvas);
router.post("/reset", canvasController.resetCanvas);


module.exports = router;
