const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

// Serve frontend from 'public' folder
app.use(express.static(path.join(__dirname, "public")));

app.post("/add", (req, res) => {
  const { a, b } = req.body;
  res.send({ result: a + b });
});

app.post("/subtract", (req, res) => {
  const { a, b } = req.body;
  res.send({ result: a - b });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
