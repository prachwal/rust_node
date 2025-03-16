// server.js
const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
