const express = require("express");
const router = express.Router();
const { isloggedin } = require("../middleware.js");
const { addToWishlist, removeFromWishlist, showWishlist } = require("../controller/wishlist.js");

// Add to wishlist
router.post("/:id", isloggedin, addToWishlist);

// Remove from wishlist
router.delete("/:id", isloggedin, removeFromWishlist);

// Show wishlist
router.get("/", isloggedin, showWishlist);

module.exports = router; 