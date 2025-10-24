import express from "express";
import { logger } from "./middleware/logger";

const app = express();
app.use(logger({ provider: "mongodb", url: "mongodb://localhost/atriar" }));

app.get("/", (req, res) => {
  res.send("Logger test route hit");
});

app.listen(3000, () => console.log("Server running on port 3000"));
