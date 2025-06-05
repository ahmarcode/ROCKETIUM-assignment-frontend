const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

const canvasRoutes = require("./routes/canvasRoutes");

app.use(cors());
app.use(bodyParser.json());

app.use("/api/canvas", canvasRoutes);

app.get("/", (req, res) => {
  res.send("Canvas API Running");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
