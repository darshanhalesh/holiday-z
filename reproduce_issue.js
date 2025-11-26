const mongoose = require('mongoose');
const Listing = require('./models/listing');
const Review = require('./models/reviews');
const listingController = require('./controllers/listing');
const fs = require('fs');

// Mock environment variables if needed
process.env.NODE_ENV = 'test';

const dbUrl = "mongodb://127.0.0.1:27017/wanderlust";
const logFile = 'repro_output.txt';

function log(message) {
    const timestamp = new Date().toISOString();
    const logMsg = `${timestamp}: ${message}\n`;
    console.log(message);
    try {
        fs.appendFileSync(logFile, logMsg);
    } catch (err) {
        // ignore
    }
}

async function reproduceIssue() {
  // Clear log file
  fs.writeFileSync(logFile, '');
  log("Starting verification script...");
  try {
    log(`Connecting to DB: ${dbUrl}`);
    await mongoose.connect(dbUrl, { serverSelectionTimeoutMS: 5000 });
    log("Database connected successfully");

    // 1. Create a dummy listing
    const newListing = new Listing({
      title: "Test Listing for Bug Repro",
      description: "This is a test listing",
      price: 100,
      location: "Test City",
      country: "Test Country",
      geometry: { type: 'Point', coordinates: [0, 0] },
      owner: new mongoose.Types.ObjectId(), // Random owner ID
    });
    await newListing.save();
    log(`Created test listing: ${newListing._id}`);

    // 2. Create a dummy review and add it to the listing
    const newReview = new Review({
        rating: 5,
        Comments: "Great place!",
        author: new mongoose.Types.ObjectId()
    });
    await newReview.save();
    
    newListing.reviews.push(newReview._id);
    
    // 3. Add a non-existent review ID to the listing
    const fakeReviewId = new mongoose.Types.ObjectId();
    newListing.reviews.push(fakeReviewId);
    await newListing.save();
    log("Added valid review and fake review ID to listing");

    // 4. Call the actual controller function
    log("Calling listingController.topListings...");
    
    const req = {};
    const res = {
        render: (view, data) => {
            log(`Render called with view: ${view}`);
            log(`Data listings count: ${data.listings.length}`);
            if (data.listings.length > 0) {
                 log("Success: Listing included in top listings (or at least processed without crash)");
            } else {
                 log("Success: Listing filtered out (or processed without crash)");
            }
        },
        redirect: (url) => {
            log(`Redirect called to: ${url}`);
        },
        flash: (type, msg) => {
            log(`Flash called: ${type} - ${msg}`);
        }
    };

    await listingController.topListings(req, res);

    log("Controller execution completed without crash.");

    // Cleanup
    await Listing.findByIdAndDelete(newListing._id);
    await Review.findByIdAndDelete(newReview._id);
    log("Cleanup done");

  } catch (err) {
    log(`Caught unexpected error: ${err.message}`);
    log(err.stack);
  } finally {
    log("Disconnecting...");
    await mongoose.disconnect();
    log("Disconnected");
  }
}

reproduceIssue();
