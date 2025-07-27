import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(5000, () => {
  console.log(`Server is running on PORT 5000`);
});
