const express = require("express");
const redis = require("redis");

const app = express();
app.use(express.json());

const client = redis.createClient({ url: "redis://redis:6379" });

client.connect().then(() => {
  console.log("Connected to Redis");
});

app.post("/add", async (req, res) => {
  const { a, b } = req.body;
  const result = a + b;
  await client.rPush("logs", `ADD: ${a} + ${b} = ${result}`);
  res.send({ result });
});

app.post("/subtract", async (req, res) => {
  const { a, b } = req.body;
  const result = a - b;
  await client.rPush("logs", `SUB: ${a} - ${b} = ${result}`);
  res.send({ result });
});

app.get("/logs", async (req, res) => {
  const logs = await client.lRange("logs", 0, -1);
  res.send({ logs });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
