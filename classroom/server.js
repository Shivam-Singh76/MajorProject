const express = require("express");
const path = require("path");                   
const app = express();

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); 

// Packages import
const flash = require("connect-flash");
const users = require("./routes/user.js");
const session = require("express-session");

// Session middleware — flash ke PEHLE hona zaroori hai
app.use(session({ secret: "mysupersecretestirng", resave: false, saveUninitialized: true }));

// middleware session ke turant baad, routes se pehle hona chahiye
app.use(flash());
app.use((req,res,next)=>{
     res.locals.successMsg=req.flash("success")
    res.locals.errorMsg=req.flash("error")
})

// GET /reqcount — har request pe session mein counter track karta hai
app.get("/reqcount", (req, res) => {
    if (req.session.count) {
        // Agar count pehle se exist karta hai toh 1 badhao
        req.session.count++;
    } else {
        // Pehli baar request aane pe count 1 se start karo
        req.session.count = 1;
    }
    // User ko batata hai kitni baar request bheji gayi
    res.send(`you send Request ${req.session.count} time`);
});

// GET /register — query string se naam uthata hai aur session mein store karta hai
// Example: /register?name=Rahul
app.get("/register", (req, res) => {
    // Agar name query mein na ho toh "anonymous" default use hoga
    let { name = "anonymous" } = req.query;

    // Name ko session mein save karta hai taaki /hello pe use ho sake
    req.session.name = name;

    
    if(name==anonymous){
        req.flash("error", "user not registred"); 
    }else{
        // Flash message set karta hai — "success" correctly spelled
    req.flash("success", "user registered successfully"); 
    }

    // User ko /hello pe redirect karta hai
    res.redirect("/hello");
});

// GET /hello — session mein stored naam se personalized greeting bhejta hai
app.get("/hello", (req, res) => {
   
    res.render("page.ejs", {
        name: req.session.name,
    });
});

// GET /test — simple test route, server sahi chal raha hai yeh verify karta hai
app.get("/test", (req, res) => {
    res.send("test successfull");
});



// const cookieParser = require("cookie-parser");
// app.use(cookieParser("secretecode"));

// app.get("/getsingedcookie", (req, res) => {
//     res.cookie("made-in", "India", { signed: true });
//     res.send("signed cookie sent");
// });

// app.get("/varify", (req, res) => {
//     console.log(req.cookies);
//     res.send("varifed");
// });

// app.use(express.json());

// app.get("/getcookies", (req, res) => {
//     res.cookie("greet", "Namaste");
//     res.cookie("madeIn", "India");
//     res.send("sent you some cookies");
// });

// app.get("/greet", (req, res) => {
//     let { name = "anonymous" } = req.cookies;
//     res.send(`Hi I am ${name}`);
// });

// app.get("/", (req, res) => {
//     console.dir(req.cookies);
//     res.send("Hi I am root");
// });

// app.use("/users", users);
// app.use("/posts", users);

// ─────────────────────────────────────────────

// Server ko port 3000 pe start karta hai
app.listen(3000, () => {
    console.log("Server is listening to port 3000");
});