if(process.env.NODE_ENV !="production"){
    require('dotenv').config()
   
}




const express = require("express");
const app = express();
const mongoose = require("mongoose");

const path = require("path");
const methodOverride = require("method-override");

const ejsMate = require('ejs-mate');
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");

const Listingsrouter = require("./routes/listing.js");
const reviewsrouter = require("./routes/review.js");
const userrouter = require("./routes/user.js");
const wishlistrouter = require("./routes/wishlist.js");
const passport = require("passport");
const Localstrategy = require("passport-local");
const User = require("./models/user.js");

const dburl = process.env.ATLAS_URL;

// const mongo_url = "mongodb://12.0.0.1:27017/wanderlust";
main().then(() => {
    console.log("connected to db");
}).catch(err => {
    console.log(err);
});

async function main() {
    await mongoose.connect(dburl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));




const store = MongoStore.create({
    mongoUrl: dburl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600
});

store.on("error", () => {
    console.log("error in mongo session store");
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};






// app.get("/", (req, res) => {
//     res.send("hi i am root");
// });






app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session())
passport.use(new Localstrategy(User.authenticate()));



passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error=req.flash("error")
   res.locals.curruser=req.user;
   
    next();
});


// app.get("/demouser",async(req,res)=>{
//     let fakeuser=new user({
//         email:"student@gmail.com",
//         username:"delta-student"
//     })
// let newregisteruser=  await  user.register(fakeuser,"helloworld");
// res.send(newregisteruser)
    
// })


app.use("/listings", Listingsrouter);
app.use("/listings/:id/reviews", reviewsrouter);
app.use("/", userrouter);
app.use("/wishlist", wishlistrouter);

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "page not found"));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).send(message);
});

app.listen(3003, () => {
    console.log("server working on port 3003");
});
