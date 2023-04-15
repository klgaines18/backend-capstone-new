if (process.env.USER) require("dotenv").config();
const express = require("express");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");


const app = express();

app.use(express.json());

//Routes

// Error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
