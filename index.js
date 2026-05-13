// CREATE — naya listing banake database mein save karta hai
// POST /listings — form submit hone pe yeh route trigger hota hai
app.post("/listings", validateListing, wrapAsync(async (req, res) => {
    
    // Form se aaya listing ka data extract karta hai
    const listingData = req.body.listing;

    // Naya listing object banata hai
    // Agar image URL diya hai toh woh use karta hai, warna default Unsplash image lagate hain
    const newListing = new Listing({
        ...listingData,
        image: {
            url: listingData.image || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
            filename: "user_upload",
        },
    });

    // Naya listing database mein save karta hai
    await newListing.save();

    // Save hone ke baad saari listings wale page pe redirect karta hai
    res.redirect("/listings");
}));