const express = require("express");

// Express ka router banata hai — routes ko alag file mein manage karne ke liye
const router = express.Router();

// Saare users ki list fetch karta hai
router.get("/users", (req, res) => {
    res.send("Get for posts");
});

// Specific user ID se ek user fetch karta hai
router.get("/users/:id", (req, res) => {
    res.send("Get for show posts");
});

// Naya user create karta hai
router.post("/users", (req, res) => {
    res.send("Post for posts");
});

// Specific user ID se ek user delete karta hai
router.delete("/users/:id", (req, res) => {
    res.send("Delete for posts id");
});

// Router ko export karta hai — server.js mein app.use() se mount hoga
module.exports = router;