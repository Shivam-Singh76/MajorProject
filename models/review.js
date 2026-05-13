// Mongoose import karta hai — database se connect karne ke liye
const mongoose = require("mongoose");

// Schema class import karta hai — model ka structure define karne ke liye
const Schema = mongoose.Schema;

// Review ka schema define karta hai — database mein kaisa data store hoga
const reviewSchema = new Schema({
    // Review ka comment — user jo likhe
    comment: String,

    // Review ki rating — 1 se 5 ke beech honi chahiye
    rating: {
        type: Number,
        min: 1, // Minimum rating 1
        max: 5, // Maximum rating 5
    },

    // Review kab create hua — automatically current time set hota hai
    createdAt: {
        type: Date,
        default: Date.now, // Automatically current date/time set karta hai
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
});

// Review model banata hai aur export karta hai — doosri files mein use hoga
module.exports = mongoose.model("Review", reviewSchema);