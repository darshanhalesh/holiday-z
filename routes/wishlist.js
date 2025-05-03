const express = require("express");
const router = express.Router();

// Test route
router.get("/test", (req, res) => {
    res.send("Wishlist router is working");
});

module.exports = router; 