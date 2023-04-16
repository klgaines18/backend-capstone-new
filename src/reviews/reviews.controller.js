const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const { movieId } = req.params;
  if(movieId) {
    const data = await reviewsService.list(movieId)
    res.json({ data });
  } else {
    next({ status: 404, message: `No Movie ID provided.` });
  }
}

function destroy(req, res) {
  res.sendStatus(204);
}

function update(req, res) {
  const { reviewId } = req.params;
  res.send(`updating review ${reviewId}`)
}

module.exports = {
  list: asyncErrorBoundary(list),
  delete: [destroy],
  update
}