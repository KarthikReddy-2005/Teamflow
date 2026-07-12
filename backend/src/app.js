import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.listen(3000, () => {
  console.log("Server is live:http://localhost:3000/");
});
