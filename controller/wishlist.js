const user = require("../models/user");
const listing = require("../models/listing");

module.exports.addToWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const currentUser = await user.findById(req.user._id);
        
        if (!currentUser.wishlist.includes(id)) {
            currentUser.wishlist.push(id);
            await currentUser.save();
            req.flash("success", "Added to wishlist!");
        } else {
            req.flash("error", "Already in wishlist!");
        }
        
        res.redirect(`/listings/${id}`);
    } catch (err) {
        req.flash("error", "Something went wrong!");
        res.redirect(`/listings/${id}`);
    }
};

module.exports.removeFromWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const currentUser = await user.findById(req.user._id);
        
        currentUser.wishlist = currentUser.wishlist.filter(item => item.toString() !== id);
        await currentUser.save();
        
        req.flash("success", "Removed from wishlist!");
        res.redirect(`/listings/${id}`);
    } catch (err) {
        req.flash("error", "Something went wrong!");
        res.redirect(`/listings/${id}`);
    }
};

module.exports.showWishlist = async (req, res) => {
    try {
        const currentUser = await user.findById(req.user._id).populate('wishlist');
        res.render("listings/wishlist", { listings: currentUser.wishlist });
    } catch (err) {
        req.flash("error", "Something went wrong!");
        res.redirect("/listings");
    }
}; 