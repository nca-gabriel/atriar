const fs = require("fs-extra");
const path = require("path");

const src = path.join(__dirname, "../src/dashboard");
const dest = path.join(__dirname, "../dist/dashboard");

fs.copy(src, dest)
  .then(() => console.log("Dashboard copied to dist"))
  .catch((err) => console.error("Copy failed:", err));
