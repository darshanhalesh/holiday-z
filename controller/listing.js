const listing=require("../models/listing");
const { cloudinary } = require("../cloudConfig");





module.exports.index=async (req, res) => {
    const alllistings = await listing.find({});
    res.render("listings/index.ejs", { alllistings });}

module.exports.rendernewform=(req, res) => {
     
    res.render("listings/new.ejs");
}

module.exports.showListing=async (req, res) => {
    let { id } = req.params;
    const Listing = await listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");
    if(!Listing){
        req.flash("error" ,"listing you requested for does not exist")
        res.redirect("/listings")
    }
    res.render("listings/show.ejs", { Listing });
}





module.exports.createListing = async (req, res) => {
    let newlisting = new listing(req.body.listing);
    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        newlisting.image = { url: result.secure_url, filename: result.public_id };
    }
    newlisting.owner = req.user._id;
    await newlisting.save();
    req.flash("success", "Successfully created");
    res.redirect("/listings");
};




module.exports.editListing=async (req, res) => {
    let { id } = req.params;
  
    const Listing = await listing.findById(id);
    if(!Listing){
        req.flash("error" ,"listing you requested for does not exist")
        res.redirect("/listings")
    }

    
    let OriginalImageUrl=listing.image.url;
    OriginalImageUrl=OriginalImageUrl.replace("/upload","/upload/w_250");


    res.render("listings/edit.ejs", { Listing ,originalUrl});
}



module.exports.updateListing=async (req, res) => {
    let { id } = req.params;
let  Listing=  await listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== 'undefined') {
      let url=req.file.path
      let filename=req.file.path
      Listing.image={url,filename}
      await Listing.save()
    }

    req.flash("success","succesfully updated")
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing=async (req, res) => {
    let { id } = req.params;
    let deletedlisting = await listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    req.flash("success","succesfully deleted")
    res.redirect("/listings");
}



