// Mongoose import karta hai — MongoDB se connect karne ke liye
const mongoose = require("mongoose");

// Sample data import karta hai — database mein daalne ke liye
const initData = require("./data.js");

// Listing model import karta hai — database operations ke liye
const Listing = require("../models/listing.js");

// MongoDB ka local connection URL
const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

// Database se connect karta hai
main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

// Pehle saara purana data delete karta hai, phir naya sample data insert karta hai
const initDb = async () => {
    await Listing.deleteMany({});       // Saare purane listings delete karta hai
    initData.data=initData.data.map((obj)=>({...obj,owner:"69f9b647a5cb126aec479316"}))
    await Listing.insertMany(initData.data); // Naya sample data insert karta hai
    console.log("data was initialized");
};

// initDb function ko call karta hai — script run hone pe data initialize hota hai
initDb();