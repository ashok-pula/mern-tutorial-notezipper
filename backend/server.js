const express=require("express");
const dotenv=require("dotenv");
const app=express();
dotenv.config();
const notes=require('./data/notes');
app.get("/",(req,res)=>{
    res.send("Hello Ashok")
})
app.get("/api/notes",(req,res)=>{
    res.json(notes)
})
app.get("/api/notes/:id",(req,res)=>{
    const id=req.params.id;
    const note=notes.find(n=>n._id===id);
    res.send(note)
})
const PORT=process.env.PORT || 5000

app.listen(PORT,console.log(`server is running.....${PORT}`))