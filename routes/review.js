const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

const { validateReview, isLoggedIn, isreviewAuther } = require("../middleware.js");
const controlllerreview=require("../controllers/reviews.js");

// Review POST route
router.post("/", isLoggedIn, validateReview,
  wrapAsync(controlllerreview.createReview)
);

// Review DELETE route
router.delete("/:reviewId", isLoggedIn, isreviewAuther,
  wrapAsync(controlllerreview.DeleteReview)
);

module.exports = router;