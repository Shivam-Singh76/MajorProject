const Listing = require("../models/listing");
const axios = require("axios");
const ExpressError = require("../utils/ExpressError");

module.exports.index = async (req, res) => {
  const { category,search } = req.query;
  let filter={};
  if (category) {
    filter.category = category;
  }
  if(search && search.trim()!=""){
    filter.$or = [
      { title:    { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
      { country:  { $regex: search, $options: "i" } },
    ];
  }
  let allListings = await Listing.find(filter); // ek hi find kaafi hai

res.render("listings/index", {
  allListings,
  currCategory: category || null,
  searchQuery: search || "",  // navbar input ke liye
});
};
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");
    if (!listing) throw new ExpressError(404, "Listing not found!");
    res.render("listings/show", { listing });
};

module.exports.createListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const listingData = req.body.listing;
    const newListing = new Listing({ ...listingData });

    const geoResponse = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: {
            q: newListing.location,
            format: "json",
            limit: 1,
        },
        headers: { "User-Agent": "MajorProject/1.0" },
    });

    const { lat, lon } = geoResponse.data[0];
    newListing.geometry = {
        type: "Point",
        coordinates: [parseFloat(lon), parseFloat(lat)],
    };

    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();

    req.flash("success", "New Listing created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) throw new ExpressError(404, "Listing not found!");
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("listings/edit", { listing, originalImageUrl });
};

module.exports.UpdateListing = async (req, res) => {
    let { id } = req.params;
    const listingData = req.body.listing;
    delete listingData.image;

    let listing = await Listing.findByIdAndUpdate(id, { ...listingData }, { new: true });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.DeleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
};