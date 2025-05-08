const user = require("../models/user");
const listing = require("../models/listing");

module.exports.addToWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const currentUser = await user.findById(req.user._id);
        const currentListing = await listing.findById(id);
        
        // Check if listing is already in wishlist
        const isInWishlist = currentUser.wishlist.some(item => item.toString() === id);
        
        if (!isInWishlist) {
            currentUser.wishlist.push(id);
            currentListing.wishlistCount += 1;
            currentListing.wishlistedBy.push(req.user._id);
            await currentUser.save();
            await currentListing.save();
            req.flash("success", "Added to wishlist!");
        } else {
            currentUser.wishlist = currentUser.wishlist.filter(item => item.toString() !== id);
            currentListing.wishlistCount -= 1;
            currentListing.wishlistedBy = currentListing.wishlistedBy.filter(userId => userId.toString() !== req.user._id.toString());
            await currentUser.save();
            await currentListing.save();
            req.flash("success", "Removed from wishlist!");
        }
        
        // Refresh the user data
        const updatedUser = await user.findById(req.user._id).populate('wishlist');
        req.user = updatedUser;
        
        res.redirect("back");
    } catch (err) {
        console.error("Wishlist error:", err);
        req.flash("error", "Something went wrong!");
        res.redirect("back");
    }
};

module.exports.removeFromWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const currentUser = await user.findById(req.user._id);
        const currentListing = await listing.findById(id);
        
        currentUser.wishlist = currentUser.wishlist.filter(item => item.toString() !== id);
        currentListing.wishlistCount -= 1;
        currentListing.wishlistedBy = currentListing.wishlistedBy.filter(userId => userId.toString() !== req.user._id.toString());
        
        await currentUser.save();
        await currentListing.save();
        
        // Refresh the user data
        const updatedUser = await user.findById(req.user._id).populate('wishlist');
        req.user = updatedUser;
        
        req.flash("success", "Removed from wishlist!");
        res.redirect("/wishlist");
    } catch (err) {
        console.error("Wishlist error:", err);
        req.flash("error", "Something went wrong!");
        res.redirect("/wishlist");
    }
};

module.exports.showWishlist = async (req, res) => {
    try {
        const currentUser = await user.findById(req.user._id).populate({
            path: 'wishlist',
            populate: {
                path: 'owner'
            }
        });
        
        if (!currentUser) {
            req.flash("error", "User not found!");
            return res.redirect("/listings");
        }
        
        res.render("listings/wishlist", { 
            listings: currentUser.wishlist,
            curruser: currentUser
        });
    } catch (err) {
        console.error("Wishlist error:", err);
        req.flash("error", "Something went wrong!");
        res.redirect("/listings");
    }
}; 