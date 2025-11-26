// Quick script to check and fix listings with invalid geometry
if (process.env.NODE_ENV != "production") { 
  require('dotenv').config();
}

const mongoose = require('mongoose');
const Listing = require('./models/listing.js');

const dbUrl = process.env.ATLAS_DB_TOKEN || "mongodb://127.0.0.1:27017/wanderlust";

async function checkListings() {
  try {
    await mongoose.connect(dbUrl);
    console.log("✓ Connected to database");

    const listings = await Listing.find({});
    console.log(`\nFound ${listings.length} listings`);
    
    let invalidCount = 0;
    for (let listing of listings) {
      if (!listing.geometry || !listing.geometry.type || !listing.geometry.coordinates) {
        console.log(`\n⚠️  Invalid geometry for listing: ${listing._id} - ${listing.title}`);
        console.log('Current geometry:', listing.geometry);
        invalidCount++;
        
        // Fix it
        listing.geometry = {
          type: 'Point',
          coordinates: [0, 0]
        };
        await listing.save();
        console.log('✓ Fixed geometry for this listing');
      } else {
        console.log(`✓ Valid geometry: ${listing.title}`);
      }
    }
    
    console.log(`\n${invalidCount} listings had invalid geometry and were fixed.`);
    
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

checkListings();
