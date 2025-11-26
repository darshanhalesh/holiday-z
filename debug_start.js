const mongoose = require('mongoose');
require('dotenv').config();

console.log("Starting debug script...");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("ATLAS_DB_TOKEN:", process.env.ATLAS_DB_TOKEN ? "Exists (starts with " + process.env.ATLAS_DB_TOKEN.substring(0, 10) + "...)" : "Missing");

const dbUrl = process.env.ATLAS_DB_TOKEN;

if (!dbUrl) {
    console.error("Error: ATLAS_DB_TOKEN is missing in .env");
    process.exit(1);
}

async function main() {
    console.log("Attempting to connect to DB...");
    try {
        await mongoose.connect(dbUrl, { serverSelectionTimeoutMS: 5000 });
        console.log("Database connected successfully!");
        process.exit(0);
    } catch (err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    }
}

main();
