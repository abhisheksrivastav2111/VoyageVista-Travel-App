const express = require("express");

const router = express.Router();// posts
// index 

router.get("/",(req,res)=>{
    res.send("Get for post  ");
});
// show -users 
router.get("/:id",(req,res)=>{
    res.send("Get for post id  ");

});
// post 
router.post("/",(req,res)=>{
    res.send("post for posts  ");

});

// delete
router.delete("/:id",(req,res)=>{
    res.send("post for post ");

});

module.exports= router;
      