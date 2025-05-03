const listing=require("../models/listing");
const { cloudinary } = require("../cloudConfig");





module.exports.index=async (req, res) => {
    try {
        let query = {};
        
        // Handle category from URL params
        if (req.params.category) {
            query.category = req.params.category;
        }
        // Handle category from query string
        else if (req.query.category) {
            query.category = req.query.category;
        }
        
        // Handle search
        if (req.query.search) {
            query.country = { $regex: req.query.search, $options: 'i' };
        }
        
        console.log("Query:", query); // Debug log
        
        const alllistings = await listing.find(query);
        console.log("Found listings:", alllistings.length); // Debug log
        
        res.render("listings/index.ejs", { 
            alllistings, 
            search: req.query.search,
            category: req.params.category || req.query.category 
        });
    } catch (err) {
        console.error("Error in index:", err);
        req.flash("error", "Something went wrong!");
        res.redirect("/listings");
    }
}

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
    if (req.files && req.files.length > 0) {
        const images = [];
        for (let file of req.files) {
            const result = await cloudinary.uploader.upload(file.path);
            images.push({ url: result.secure_url, filename: result.public_id });
        }
        newlisting.images = images;
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

    
    // let OriginalImageUrl=listing.image.url;
    // OriginalImageUrl=OriginalImageUrl.replace("/upload","/upload/w_250");
    let OriginalImageUrl = Listing.image ? Listing.image.url.replace("/upload", "/upload/w_250") : null;
    console.log(Listing);


    res.render("listings/edit.ejs", { Listing ,OriginalImageUrl});
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



