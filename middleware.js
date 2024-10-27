const Listing =require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema,reviewSchema} = require("./schema.js");
const review = require("./models/review.js");


module.exports.isLoogedIn = (req, res, next) => {
  // Check if user is logged in
  if (!req.isAuthenticated()) {
      req.session.redirectUrl = req.originalUrl;
      req.flash("error","You must be logged in first");
       return res.redirect('/login');
  }
  // If not logged in, redirect to login page or handle accordingly
   next();
};


module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();

};


module.exports.isOwner = async(req,res,next)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if(!listing.owner._id.equals(res.locals.currUser._id)){
      req.flash("error","You don't have permission to edit");
    
     return  res.redirect(`/listings/${id}`);
    }
    next();
};


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


  
  module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let reviewDoc = await review.findById(reviewId); // Rename variable to avoid conflict

    if (!reviewDoc || !reviewDoc.author._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You did not create this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

