// Built-in Error class ko extend karke custom error banata hai
class ExpressError extends Error {
    
    // statusCode — HTTP status code (404, 400, 500 etc.)
    // message — error ka description
    constructor(statusCode, message) {
        
        // Parent Error class ko call karta hai
        super();
        
        // HTTP status code set karta hai — response mein use hoga
        this.statusCode = statusCode;
        
        // Error ka message set karta hai — user ko dikhega
        this.message = message;
    }
}

// Doosri files mein use karne ke liye export karta hai
module.exports = ExpressError;