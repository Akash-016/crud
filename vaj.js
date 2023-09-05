const express=require('express');
var app =express();
const bodyParser = require('body-parser');
const axios =require('axios');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
const {MongoClient, ObjectId}=require('mongodb')
const asy_h=require('express-async-handler');
const { emit } = require('nodemon');
const bcrypt = require('bcrypt');
app.use(express.urlencoded({ extended: false }))
let db;
let port=3005;
MongoClient.connect('mongodb+srv://2012038:2012038@cluster0.tb1iiry.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser:true,UseUnifiedTopology:true}).then((client)=>{
    db=client.db('Flexter')
    console.log("Connected to database"+" "+`port run on ${port}`)
})
app.listen(port);
app.get("/",asy_h(async(req,res)=>{
    res.send(`<form action="/add" method="post"><button>add</button></form>
    <form action="/update" method="post"><button>update</button></form>
    <form action="/read" method="post"><button>read</button></form>
    <form action="/delete" method="post"><button>delete</button></form>`)
}))
app.post("/add",asy_h(async(req,res)=>{
    const insertResult = await db.collection("mycollection").insertOne({
        name: "Akash",
        age: 30,
    });
    res.send("Data added");
}))

app.post("/update",asy_h(async(req,res)=>{
    const updateResult = await db.collection("mycollection").updateOne(
        { name: "Akash" },
        { $set: { age: 32 } }
      );
      res.send("Data updated");
}))

app.post("/read",asy_h(async(req,res)=>{
    const findResult = await db.collection("mycollection").findOne({ name: "Akash" });
    res.send(findResult);
}))

app.post("/delete",asy_h(async(req,res)=>{
    const deleteResult = await db.collection("mycollection").deleteOne({ name: "John Doe" });
    res.send("Data deleted")
}))
