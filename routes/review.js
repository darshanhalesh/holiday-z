const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const listing = require("../models/listing.js");
const { validateReview, isloggedin, isreviewauthor } = require("../middleware.js");
const { createreview, deletereview } = require("../controller/review.js");

// Create review route
router.post("/", isloggedin, validateReview, wrapAsync(createreview));

// Delete review route
router.delete("/:reviewId", isloggedin, isreviewauthor, wrapAsync(deletereview));

module.exports = router;
