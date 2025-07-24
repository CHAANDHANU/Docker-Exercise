const express = require("express");
const redis = require("redis");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const client = redis.createClient({ url: "redis://redis:6379" });

client.connect().then(() => console.log("Connected to Redis"));

function operate(op, a, b) {
  switch (op) {
    case "add": return a + b;
    case "subtract": return a - b;
    case "multiply": return a * b;
    case "divide": return b !== 0 ? a / b : "Error";
    case "mod": return a % b;
    default: return "Invalid";
  }
}

app.post("/calc", async (req, res) => {
  const { a, b, operation } = req.body;
  const result = operate(operation, a, b);
  await client.rPush("logs", `${operation.toUpperCase()}: ${a}, ${b} => ${result}`);
  res.send({ result });
});

app.get("/logs", async (req, res) => {
  const logs = await client.lRange("logs", 0, -1);
  res.send({ logs });
});

app.listen(3000, () => console.log("Backend running on port 3000"));
