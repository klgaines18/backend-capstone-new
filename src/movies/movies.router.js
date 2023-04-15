const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const reviewsRouter = require("../reviews/reviews.router");

// need to add validation
router.use("/:movieId/reviews", reviewsRouter);

router
  .route("/:movieId")
  .get(controller.read)
  .all(methodNotAllowed);

router
  .route("/")
  .get(controller.list)
  .all(methodNotAllowed);

module.exports = router;