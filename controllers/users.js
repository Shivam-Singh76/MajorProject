const User = require("../models/user.js");

module.exports.renderSignup = (req, res) => {
    res.render("users/signup.ejs");  // ✅ signup sahi spelling
}

module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.session.save(() => {
                req.flash("success", "Welcome to Wonderlust");
                let redirectUrl = res.locals.redirectUrl || "/listings";
                res.redirect(redirectUrl);
            });
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");  // ✅
    }
}

module.exports.renderLogin = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.Login = (req, res) => {
    req.session.save(() => {
        req.flash("success", "Welcome back to Wonderlust!");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    });
}

module.exports.Logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "You are logged out");
        res.redirect("/listings");
    });
}