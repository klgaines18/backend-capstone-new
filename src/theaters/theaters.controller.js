function list(req, res) {
  const { movieId } = req.params
  if (movieId) {
    res.send(`Listing theaters showing movie: ${movieId}`)
  } else {
    res.send("showing all theaters with movies")
  }
}

module.exports = {
  list
}