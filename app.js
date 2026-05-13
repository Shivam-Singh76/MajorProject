if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const aiRouter = require("./routes/ai.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// ─────────────────────────────────────────────
// DATABASE CONNECTION
// ─────────────────────────────────────────────

const dbUrl = process.env.ATLASDB;

async function main() {
    await mongoose.connect(dbUrl);
}

main()
    .then(() => console.log("Connected to DB ✅"))
    .catch((err) => console.log("DB Error ❌", err));

// ─────────────────────────────────────────────
// SESSION STORE
// ─────────────────────────────────────────────

const store = new MongoStore({           // ✅ new MongoStore
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 60 * 60,
});

store.on("error", (err) => {
    console.log("Session Store Error ❌", err);
});

// ─────────────────────────────────────────────
// SESSION CONFIG
// ─────────────────────────────────────────────

const sessionOption = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

// ─────────────────────────────────────────────
// MIDDLEWARE SETUP
// ─────────────────────────────────────────────

app.use(express.static(path.join(__dirname, "/public")));
app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user || null;
    next();
});

// ─────────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────────

app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
app.use("/ai", aiRouter);

// ─────────────────────────────────────────────
// ERROR HANDLING
// ─────────────────────────────────────────────

app.all("*splat", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { message });
});

// ─────────────────────────────────────────────
// SERVER START
// ─────────────────────────────────────────────

// ✅ Change to this
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
});





