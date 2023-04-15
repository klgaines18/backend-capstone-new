function list(req, res) {
  const isShowing = req.query.is_showing;
  if (isShowing === 'true') {
    res.send("is showing is true")
  } else {
    res.send("is showing is not true")
  }
}

function read(req, res, next) {
  const { movieId } = req.params;
  res.send(`Trying to grab movieID: ${movieId}`)
}

module.exports = {
  list,
  read
}