const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// ✅ Fix — Node.js v25 ESM/CJS conflict ki wajah se .default || plm use karo
const plm = require("passport-local-mongoose");
const passportLocalMongoose = plm.default || plm;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);