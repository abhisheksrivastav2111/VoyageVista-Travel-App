const express = require("express");
const app = express();
const mongoose = require("mongoose");

const ejsMate = require("ejs-mate"); // Import ejs-mate

const path = require("path");
const methodOverride = require("method-override");

const ExpressError = require('./utils/ExpressError.js');
const session = require("express-session");

const flash = require("connect-flash");
const passport  = require ("passport");
const  LocalStratgy = require("passport-local");
const User = require("./models/user.js");

const listingRoute = require("./routes/listing.js");




const reviewRoute =require("./routes/review.js");
const userRoute =require("./routes/user.js");

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {   
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate); // Use ejs-mate as the layout engine

app.use(express.static(path.join(__dirname,"/public")));



 app.get("/", (req, res) => {
  res.send("Hi, I am root");
});
 

 


 
 app.use(session(sessionOption));

 app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratgy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

 app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  
  next();
});

  






// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


app.use("/listings",listingRoute);

app.use("/listings/:id/reviews",reviewRoute);
app.use("/",userRoute);


 


// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach", 
//     price: 1200,
//     location: "Calangute, Goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });

app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"Page not found"));
});

app.use((err,req,res,next)=>{
  let{statusCode=500,message= "somthing went wrong"} =err;
  res.status(statusCode).render("listings/error.ejs",{message})
  // res.status(statusCode).send(message);
});

app.listen(8000, () => {
  console.log("server is listening to port 8080");
});