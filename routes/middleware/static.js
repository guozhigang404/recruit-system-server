const express = require("express");
const path = require("path");

const staticRoot = path.resolve(__dirname, "./../../public");
module.exports = express.static(staticRoot);
