const express = require('express');
const router = express.Router();
const canvasController = require('../controllers/canvasController');

router.post('/init', canvasController.initCanvas);
router.post('/add-shape', canvasController.addShape);
router.post('/add-text', canvasController.addText);

module.exports = router;