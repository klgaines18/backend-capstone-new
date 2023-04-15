function list(req, res) {
  const { movieId } = req.params;
  res.send(`getting reviews for movieId: ${movieId}`)
}

function destroy(req, res) {
  res.sendStatus(204);
}

function update(req, res) {
  const { reviewId } = req.params;
  res.send(`updating review ${reviewId}`)
}

module.exports = {
  list,
  delete: [destroy],
  update
}