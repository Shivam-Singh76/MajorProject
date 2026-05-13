const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");

const { listingSchema } = require("../schema.js"); 
const { isLoggedIn, isowner, validateListing } = require("../middleware.js");
const listingControllers=require("../controllers/listings.js")
const multer  = require('multer')
const {storage}=require("../CloudConflig.js")
const upload = multer({ storage })

router
.route("/")
.get( wrapAsync(listingControllers.index))
.post(
     isLoggedIn,  
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingControllers.createListing)
);

router.get("/new", isLoggedIn,listingControllers.renderNewForm );
 router
 .route("/:id")
 .get( wrapAsync(listingControllers.showListing))
 .put( isLoggedIn, isowner,upload.single("listing[image]"), validateListing, wrapAsync(listingControllers.UpdateListing))
 .delete( isLoggedIn, isowner, wrapAsync(listingControllers.DeleteListing))






// EDIT
router.get("/:id/edit", isLoggedIn, isowner, wrapAsync(listingControllers.renderEditForm));
module.exports = router;