const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const isShowing = req.query.is_showing;
  if (isShowing === 'true') {
    const data = await moviesService.listShowing()
    res.json({ data });
  } else {
    const data = await moviesService.listAll()
    res.json({ data });
  }
}

function read(req, res, next) {
  const { movieId } = req.params;
  res.send(`Trying to grab movieID: ${movieId}`)
}

module.exports = {
  list: asyncErrorBoundary(list),
  read
}