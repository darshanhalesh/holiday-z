const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const listing = require("../models/listing.js");
const { isloggedin, isowner,validateListing } = require("../middleware.js");
const { index, rendernewform, createListing, editListing, updateListing, deleteListing, showListing } = require("../controller/listing.js");
const multer=require("multer");
const { storage } = require("../cloudConfig.js");
const upload =multer({storage})

router.route("/")
.get( wrapAsync(index))
.post( isloggedin,upload.single("listing[image]"),validateListing, wrapAsync(createListing));




// New route
router.get("/new",isloggedin, rendernewform);


router.route("/:id")
.get(wrapAsync(showListing))
.put(isloggedin,isowner,upload.single("listing[image]"),validateListing ,wrapAsync(updateListing))
.delete(isloggedin,isowner,wrapAsync(deleteListing))
// Show route




// Edit route
router.get("/:id/edit",wrapAsync(editListing));

// Update route


module.exports = router;
