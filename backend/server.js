const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const canvasRoutes = require('./routes/canvasRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/canvas', canvasRoutes);

app.listen(PORT, () => {
    console.log(`Canvas Builder API running at http://localhost:${PORT}`);
})