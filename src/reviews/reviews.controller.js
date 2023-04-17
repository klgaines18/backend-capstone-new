const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const { movieId } = req.params;
  if (movieId) {
    const data = await reviewsService.list(movieId);
    res.json({ data });
  } else {
    next({ status: 404, message: `No Movie ID provided.` });
  }
}

function read(req, res) {
  const { review: data } = res.locals;
  res.json({ data });
}

async function destroy(req, res) {
  const { review } = res.locals;
  await reviewsService.delete(review.review_id);
  res.sendStatus(204);
}

async function update(req, res, next) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const data = await reviewsService.update(updatedReview);
  return next();
}

async function reviewExists(req, res, next) {
  const review = await reviewsService.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: `Review cannot be found.` });
}

module.exports = {
  list: asyncErrorBoundary(list),
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(read),
  ],
  read: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(read)],
};
