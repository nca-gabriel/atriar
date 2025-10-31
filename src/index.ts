import express from "express";
import atriar from "./middleware/atriar";

const app = express();
app.use(atriar({ provider: "mongodb", url: "mongodb://localhost/atriar" }));

app.get("/", (req, res) => {
  res.send("Logger test route hit");
});

app.listen(3000, () => console.log("Server running on port 3000"));
