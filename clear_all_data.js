if (process.env.NODE_ENV != "production") { 
  require('dotenv').config();
}

const mongoose = require('mongoose');
const dbUrl = process.env.ATLAS_DB_TOKEN || "mongodb://127.0.0.1:27017/wanderlust";

async function clearAllData() {
  try {
    console.log("Connecting to database:", dbUrl);
    await mongoose.connect(dbUrl);
    console.log("✓ Connected successfully");

    // Get all collections
    const collections = await mongoose.connection.db.collections();
    
    console.log("\n📊 Current data counts:");
    for (let collection of collections) {
      const count = await collection.countDocuments();
      console.log(`  ${collection.collectionName}: ${count} documents`);
    }

    console.log("\n🗑️  Deleting all data...");
    
    let totalDeleted = 0;
    for (let collection of collections) {
      const result = await collection.deleteMany({});
      console.log(`  ✓ Deleted ${result.deletedCount} from ${collection.collectionName}`);
      totalDeleted += result.deletedCount;
    }

    console.log(`\n✅ Total documents deleted: ${totalDeleted}`);
    
    console.log("\n📊 Verification - final counts:");
    for (let collection of collections) {
      const count = await collection.countDocuments();
      console.log(`  ${collection.collectionName}: ${count} documents`);
    }

  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await mongoose.connection.close();
    console.log("\n✓ Database connection closed");
    process.exit(0);
  }
}

clearAllData();
