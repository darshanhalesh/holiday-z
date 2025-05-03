const listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createreview = async (req, res) => {
    try {
        const { id } = req.params;
        const { Comment, rating } = req.body.review;
        
        if (!Comment || !rating) {
            throw new Error("Comment and rating are required");
        }

        const listings = await listing.findById(id);
        if (!listings) {
            throw new Error("Listing not found");
        }

        const newReview = new Review({
            Comment,
            rating,
            author: req.user._id
        });

        listings.reviews.push(newReview);
        await newReview.save();
        await listings.save();

        req.flash("success", "New review created");
        res.redirect(`/listings/${id}`);
    } catch (err) {
        console.error("Review creation error:", err);
        req.flash("error", err.message || "Failed to create review");
        res.redirect(`/listings/${req.params.id}`);
    }
};

module.exports.deletereview = async (req, res) => {
    try {
        const { id, reviewId } = req.params;
        
        const listings = await listing.findById(id);
        if (!listings) {
            throw new Error("Listing not found");
        }

        await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);
        
        req.flash("success", "Review deleted successfully");
        res.redirect(`/listings/${id}`);
    } catch (err) {
        console.error("Review deletion error:", err);
        req.flash("error", err.message || "Failed to delete review");
        res.redirect(`/listings/${req.params.id}`);
    }
};