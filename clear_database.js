/**
 * Database Cleanup Script
 * WARNING: This will delete ALL data from the database!
 * Use with caution - this operation cannot be undone.
 */

if (process.env.NODE_ENV != "production") { 
  require('dotenv').config();
}

const mongoose = require('mongoose');
const User = require('./models/user.js');
const Listing = require('./models/listing.js');
const Review = require('./models/reviews.js');
const Blog = require('./models/blog.js');
const Booking = require('./models/booking.js');
const Feedback = require('./models/feedback.js');

const dbUrl = process.env.ATLAS_DB_TOKEN || "mongodb://127.0.0.1:27017/wanderlust";

async function clearDatabase() {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(dbUrl);
    console.log("✓ Connected to database");

    console.log("\n⚠️  WARNING: About to delete ALL data from the database!");
    console.log("Database:", dbUrl);
    
    // Delete all documents from each collection
    const results = {
      users: await User.deleteMany({}),
      listings: await Listing.deleteMany({}),
      reviews: await Review.deleteMany({}),
      blogs: await Blog.deleteMany({}),
      bookings: await Booking.deleteMany({}),
      feedbacks: await Feedback.deleteMany({})
    };

    console.log("\n✓ Database cleared successfully!");
    console.log("\nDeleted records:");
    console.log(`  - Users: ${results.users.deletedCount}`);
    console.log(`  - Listings: ${results.listings.deletedCount}`);
    console.log(`  - Reviews: ${results.reviews.deletedCount}`);
    console.log(`  - Blogs: ${results.blogs.deletedCount}`);
    console.log(`  - Bookings: ${results.bookings.deletedCount}`);
    console.log(`  - Feedbacks: ${results.feedbacks.deletedCount}`);
    
    console.log(`\n✓ Total records deleted: ${
      results.users.deletedCount + 
      results.listings.deletedCount + 
      results.reviews.deletedCount + 
      results.blogs.deletedCount + 
      results.bookings.deletedCount + 
      results.feedbacks.deletedCount
    }`);

  } catch (err) {
    console.error("❌ Error clearing database:", err);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("\n✓ Database connection closed");
    process.exit(0);
  }
}

// Run the cleanup
clearDatabase();
