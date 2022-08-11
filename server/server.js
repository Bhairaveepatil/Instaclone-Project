const express= require ("express")
const mongoose = require("mongoose");
const multer=require("multer")
const postModel = require("./model/post")
const app=express()
const fs=require("fs")
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//storage
const Storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload=multer({
    storage:Storage
}).single("testimage")


//mongodb connection

mongoose.connect("mongodb+srv://bhairavee:bhairavee@instaclone.fzhwmru.mongodb.net/Instaclone?retryWrites=true&w=majority",()=>{
    console.log("connect to db...");
},(err)=>{
    console.log(err);
});


app.post("/post",(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }else{
            const newImage=new postModel({
                author:req.body.name,
                location:req.body.location,
                description:req.body.description,
                date:req.body.date,
                image:{
                    data:fs.readFileSync("uploads/" +req.file.filename) ,
                    contentType:"image/png"
                }
            })
            newImage.save().then(()=>{
                res.send("success")
            }).catch((err)=>{
                console.log(err)
            })
        }
    })
})

app.get("/",(req,res)=>{
    try{
        postModel.find().sort({_id:-1}).then((allData)=>{
            res.status(200).json(allData)
        })
    }catch(err){
        console.log(err)
    }
})
// app.delete('/deletepost/:postId',(req,res)=>{
//     post.findOne({_id:req.params.postId})
//     .populate("postedBy","_id")
//     .exec((err,posts)=>{
//         if(err|| !posts){
//             return res.status(422).json({error:err})
//         }
//         if(posts.postedBy._id.toString() === req.user.id.toString()){
//             posts.remove()
//         }
//     })
// })

const port = process.env.PORT || 3001;

app.listen(port, function() {
    console.log("Server started.......on",port);
});
