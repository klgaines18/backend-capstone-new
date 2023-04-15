if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

const onlyMovies = (req, res) => {
  const isShowing = req.query.is_showing
  const content = isShowing ? 'Is Showing is present' : "Is Showing not present"
  res.send(content)
}

app.get('/movies', onlyMovies)

module.exports = app;
