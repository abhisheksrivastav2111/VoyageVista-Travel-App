const express = require("express");
const app = express();

const users = require("./routes/user");
const posts =require("./routes/post");
const cookieParser = require ("cookie-parser");

const path =require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const session = require("express-session");
const flash = require("connect-flash");
const sessionOption ={
     secret:"mysupersecretstring",
     resave:false,
     saveUninitialized:true
    };


app.use(session(sessionOption));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.successMsg =req.flash("success");
    res.locals.errorMsg =req.flash("success");
    next();

})
app.get("/register",(req,res)=>{
    let {name="Shivam"}=req.query;
    req.session.name = name;
    // flash is middleware used when switchung is done 

    if(name==="Shivam"){
        req.flash("success","user not registered");

    }else{
        req.flash("success","user registered");
    }


    res.redirect("/hello");
  });
  
  app.get("/hello",(req,res)=>{

  res.render("page.ejs",{name:req.session.name});
  });
  
// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count = 1;
//     }
//     res.send(`You sent a request ${req.session.count} times`);
// });

// app.get("/test",(req,res)=>{
//     res.send("test successful");
// });


// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made-in","india",{signed:true});
//     res.send("signedcookie send");
// });

// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("verified");
// });

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","hello");
//     res.send("send ypu some cookies");
// });
// app.get("/greet",(req,res)=>{

//     let{name="Shivam"}=req.cookies;
//     res.send(`hi ,${name}`);
 
//  });

// app.get("/",(req,res)=>{

//     console.dir(req.cookies);
//     res.send("Hi I am  Shivam Gupta ");

// });

// app.use("/users",users);
// app.use("/posts",posts);



app.listen(3000,()=>{
    console.log("server is listening to port 3000");
});



