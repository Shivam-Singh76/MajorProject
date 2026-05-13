const express = require("express");
const router = express.Router();

// Smart Trip Planner
router.post("/trip-plan", async (req, res) => {
  const { destination, days, budget, style } = req.body;
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: `Create a ${days}-day ${style} trip plan for ${destination} with ${budget} budget. Include day-wise itinerary, must-visit places, local food, and travel tips.`
        }]
      })
    });
    const data = await response.json();
    res.json({ plan: data.content[0].text });
  } catch (e) {
    res.status(500).json({ plan: "Error generating plan." });
  }
});

// Travel Chat Assistant
router.post("/chat", async (req, res) => {
  const { messages } = req.body;
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: "You are a helpful travel assistant. Answer travel questions only.",
        messages: messages
      })
    });
    const data = await response.json();
    res.json({ reply: data.content[0].text });
  } catch (e) {
    res.status(500).json({ reply: "Error. Try again." });
  }
});

// AI page render
router.get("/", (req, res) => {
 res.render("ai.ejs", { currUser: req.user });
});

module.exports = router;