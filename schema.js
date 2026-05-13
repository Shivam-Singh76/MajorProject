// Joi — data validation library, form se aaya data check karne ke liye
const Joi = require('joi');

// Listing ka validation schema — naya listing banate ya edit karte waqt data validate karta hai
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        // Title — required, khaali nahi hona chahiye
        title: Joi.string().required(),

        // Description — required, khaali nahi hona chahiye
        description: Joi.string().required(),

        // Location — required, khaali nahi hona chahiye
        location: Joi.string().required(),

        // Country — required, khaali nahi hona chahiye
        country: Joi.string().required(),

        // Price — required, 0 se kam nahi hona chahiye
        price: Joi.number().required().min(0),

        // Image URL — optional hai, khaali ya null bhi ho sakta hai
        image: Joi.string().allow("", null),
        category: Joi.string().allow("", null), 
    }).required()
});

// Review ka validation schema — naya review submit karte waqt data validate karta hai
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        // Rating — required, 1 se 5 ke beech honi chahiye
        rating: Joi.number().required().min(1).max(5),

        // Comment — required, khaali nahi hona chahiye
        comment: Joi.string().required()
    }).required()
});