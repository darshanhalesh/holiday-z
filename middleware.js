const listing=require("./models/listing")
const Review=require("./models/review.js")
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema,reviewSchema } = require("./schema.js");

module.exports.isloggedin=  (req,res,next) =>{


 if(!req.isAuthenticated()){
  req.session.redirectUrl=req.originalUrl
    req.flash("error","you must be loggedin")
  return  res.redirect("/login")
}
next();
}


module.exports.saveRedirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl
  }
  next()
}


module.exports.isowner= async(req,res,next)=>{
  let{id}=req.params
  let Listing= await listing.findById(id);
  if(!Listing.owner.equals(res.locals.curruser._id)){
      req.flash("error","you dont have permission to edit")
   return   res.redirect(`/listings/${id}`)
  }
  next()
}


 module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
  } else {
      next();
  }
};


module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
  } else {
      next();
  }
};

// module.exports.isreviewauthor= async(req,res,next)=>{
//   let{id,reviewid}=req.params
//   let review=await Review.findById(reviewid);
//   if(!review.author.equals(res.locals.curruser._id)){
//       req.flash("error","you are not author")
//    return   res.redirect(`/listings/${id}`)
//   }
//   next()
// }





module.exports.isreviewauthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    console.log(reviewId)
    let review = await Review.findById(reviewId);
    if (!review) {
        req.flash("error", "Review not found");
        return res.redirect(`/listings/${id}`);
    }
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You are not the author");
        return res.redirect(`/listings/${id}`);
    }
    next();
};



