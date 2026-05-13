const express = require("express");

// Express ka router banata hai — routes ko alag file mein manage karne ke liye
const router = express.Router();

// Saare posts fetch karta hai
router.get("/posts", (req, res) => {         
    res.send("Get for posts");
});

// Specific post ID se ek post fetch karta hai
router.get("/posts/:id", (req, res) => {
    res.send("Get for show posts");
});

// Naya post create karta hai
router.post("/posts", (req, res) => {        
    res.send("Post for posts");
});

// Specific post ID se ek post delete karta hai
router.delete("/posts/:id", (req, res) => { 
    res.send("Delete for posts id");
});

// Yeh router ko export karta hai — server.js mein use hoga
module.exports = router;