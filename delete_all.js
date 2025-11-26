if (process.env.NODE_ENV != "production") { 
  require('dotenv').config();
}

const mongoose = require('mongoose');
const dbUrl = process.env.ATLAS_DB_TOKEN || "mongodb://127.0.0.1:27017/wanderlust";

console.log("Database URL:", dbUrl);
console.log("Attempting connection...");

mongoose.connect(dbUrl)
  .then(async () => {
    console.log("SUCCESS: Connected to database");
    
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    console.log("\nCollections found:", collections.length);
    
    for(let coll of collections) {
      const collection = db.collection(coll.name);
      const count = await collection.countDocuments();
      console.log(`- ${coll.name}: ${count} documents`);
      
      if (count > 0) {
        console.log(`  Deleting all from ${coll.name}...`);
        const result = await collection.deleteMany({});
        console.log(`  ✓ Deleted ${result.deletedCount} documents`);
      }
    }
    
    console.log("\nAll data deleted successfully!");
    process.exit(0);
  })
  .catch(err => {
    console.error("ERROR:", err.message);
    process.exit(1);
  });
