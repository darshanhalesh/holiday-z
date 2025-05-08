const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    description: String,
    images: [{
        url: String,
        filename: String,
    }],
    price: Number,
    location: String,
    country: String,
    category: {
        type: String,
        enum: ['Trending', 'Room', 'Iconic Cities', 'Mountains', 'Castles', 'Amazing Pools', 'Camping', 'Farms', 'Arctic', 'Boats'],
        required: true
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number]
        }
    },
    wishlistCount: {
        type: Number,
        default: 0
    },
    wishlistedBy: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } })
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
