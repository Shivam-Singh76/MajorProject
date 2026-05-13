const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

async function fixCategories() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");

  const result = await Listing.updateMany(
    { $or: [
        { category: { $exists: false } },
        { category: null },
        { category: "" }
    ]},
    { $set: { category: "trending" } }
  );

  console.log(`${result.modifiedCount} listings updated!`);
  mongoose.disconnect();
}

fixCategories();