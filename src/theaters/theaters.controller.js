const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const { movieId } = req.params;
  if (movieId) {
    const data = await theatersService.listGivenMovie(movieId);
    res.json({ data });
  } else {
    const data = await theatersService.listAll();
    res.json({ data });
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
};
