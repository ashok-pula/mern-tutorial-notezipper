const express=require("express");
const dotenv=require("dotenv");
const connectDB=require("./config/db.js")
const notes=require('./data/notes');
const useRouter =require("./router/userRouter.js");
const noteRouter=require("./router/noteRouter.js")
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
const app=express();
dotenv.config();
connectDB();
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Hello Ashok")
})
// app.get("/api/notes",(req,res)=>{
//     res.json(notes)
// })
app.use("/api/users",useRouter);
app.use("/api/notes",noteRouter);

// app.get("/api/notes/:id",(req,res)=>{
//     const id=req.params.id;
//     const note=notes.find(n=>n._id===id);
//     res.send(note)
// })
//error handling middleware
app.use(notFound);
app.use(errorHandler);
const PORT=process.env.PORT || 5000

app.listen(PORT,console.log(`server is running.....${PORT}`))