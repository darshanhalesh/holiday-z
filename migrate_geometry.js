// Migration script to fix geometry for all existing listings
if (process.env.NODE_ENV != "production") { 
  require('dotenv').config();
}

const mongoose = require('mongoose');

const dbUrl = process.env.ATLAS_DB_TOKEN || "mongodb://127.0.0.1:27017/wanderlust";

async function migrateGeometry() {
  try {
    await mongoose.connect(dbUrl);
    console.log("✓ Connected to database");

    // Access the listings collection directly
    const db = mongoose.connection.db;
    const listingsCollection = db.collection('listings');
    
    const allListings = await listingsCollection.find({}).toArray();
    console.log(`\nFound ${allListings.length} listings to check`);
    
    let fixedCount = 0;
    
    for (let listing of allListings) {
      let needsUpdate = false;
      let updateData = {};
      
      // Check if geometry exists and has proper structure
      if (!listing.geometry || !listing.geometry.type || !listing.geometry.coordinates) {
        console.log(`\n⚠️  Fixing geometry for: ${listing.title || listing._id}`);
        console.log('Current geometry:', listing.geometry);
        
        updateData.geometry = {
          type: 'Point',
          coordinates: [0, 0]
        };
        needsUpdate = true;
      }
      
      if (needsUpdate) {
        await listingsCollection.updateOne(
          { _id: listing._id },
          { $set: updateData }
        );
        console.log('✓ Fixed!');
        fixedCount++;
      }
    }
    
    console.log(`\n✅ Migration complete! Fixed ${fixedCount} listings.`);
    
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await mongoose.connection.close();
    console.log("✓ Database connection closed");
    process.exit(0);
  }
}

migrateGeometry();
