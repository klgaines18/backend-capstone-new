if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

const moviesRouter = require("./movies/movies.router");

app.use(cors());
app.use(express.json());

//Routes
app.use("/movies", moviesRouter)

// Error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
