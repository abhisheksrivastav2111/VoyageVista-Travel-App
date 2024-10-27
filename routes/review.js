const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoogedIn, isReviewAuthor } = require("../middleware.js");
const Review = require("../models/review.js");
const Listing = require('../models/listing');
const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const reviewController = require("../controllers.js/reviews.js");

router.post("/", isLoogedIn, validateReview, wrapAsync(reviewController.createReview));

router.delete("/:reviewId",isLoogedIn,isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;