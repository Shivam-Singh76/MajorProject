// Async route functions ko wrap karta hai — try/catch likhne ki zaroorat nahi padti
// Agar koi bhi async function mein error aaye toh automatically next(err) call karta hai
module.exports = (fn) => {
    return (req, res, next) => {
        
        // fn execute karta hai — error aane pe next() ko bhejta hai
        // next(err) call hone pe Express ka error handler pakad leta hai
        fn(req, res, next).catch(next); // ✅ .catch → .catch(next) fix kiya
    };
};