
const listing=require("../models/listing");
const Review=require("../models/review")


module.exports.createreview=async (req, res) => {
    let listings = await listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author=req.user._id;
    
    let newreview=new Review(req.body.review)
    newreview.author=req.user._id
    
    listings.reviews.push(newReview);
    await newReview.save();
    await listings.save();

    req.flash("success","new review created")
    res.redirect(`/listings/${listings._id}`);
}
module.exports.deletereview=async (req, res) => {
    let listings = await listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author=req.user._id;
    console.log(newReview)
    let newreview=new Review(req.body.review)
    newreview.author=req.user._id
    console.log(newreview)
    listings.reviews.push(newReview);
    await newReview.save();
    await listings.save();
    console.log(newReview);
    req.flash("success","new review created")
    res.redirect(`/listings/${listings._id}`);
}