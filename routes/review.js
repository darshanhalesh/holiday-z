
const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const listing = require("../models/listing.js");
const { validateReview, isloggedin, isreviewauthor } = require("../middleware.js");
const { createreview } = require("../controller/review.js");
const { deleteListing } = require("../controller/listing.js");



// Create review route
router.post("/",isloggedin ,validateReview, wrapAsync(createreview));

// Delete review route
router.delete("/:reviewId", isloggedin,isreviewauthor,wrapAsync(deleteListing));

module.exports = router;
