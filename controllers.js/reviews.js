const Review = require("../models/review.js");
const Listing = require('../models/listing');


module.exports.createReview =async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', 'Listing not found');
        return res.redirect('/listings');
    }
    const newReview = new Review(req.body.review);
    newReview.author=req.user._id;

 
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created");
    res.redirect(`/listings/${id}`);
};


module.exports.deleteReview =async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
};
