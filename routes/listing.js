const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const flash = require("connect-flash");
const {isLoogedIn,isOwner,validateListing} = require("../middleware.js");
   const listingController = require("../controllers.js/listings.js")
// Session configuration
const session = require("express-session");
const sessionOptions = {
  secret: "mysupersecretstring",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

router.use(session(sessionOptions));
router.use(flash());




router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoogedIn,validateListing, wrapAsync(listingController.createListing));




// New Route (Render form to create a new listing)
router.get("/new", isLoogedIn, listingController.renderNewForm);

// Show, Edit, Update, Delete Routes for specific listing
router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(isLoogedIn, isOwner, validateListing, wrapAsync(listingController.updateListing))
  .delete(isLoogedIn, isOwner, wrapAsync(listingController.deleteListing));

// Edit Route (Render form to edit a specific listing)
router.get("/:id/edit", isLoogedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;


