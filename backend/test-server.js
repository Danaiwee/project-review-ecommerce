import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(5001, () => {
  console.log("✅ Minimal server running on port 5001");
});
