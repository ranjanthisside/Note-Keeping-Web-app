import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


// mongodb connection
const MONGO_URI = process.env.MONGO_URI;
mongoose
.connect(MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch((err) => console.log("DB Error: ", err));

// schema and model
const noteSchema = new mongoose.Schema({
    text:String,
});

const Note = mongoose.model("Note", noteSchema);

// routes

// get all notes
app.get("/notes", async(req,res)=>{
    const notes = await Note.find();
    res.json(notes);
});

// post new note
app.post("/notes", async(req,res) => {
    const newNote = new Note({text: req.body.note});
    await newNote.save();
    res.json({message: "Note saved to DB"});
});


// delete note
app.delete("/notes/:id", async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({message:"Note deleted"});
});


// starting server
app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
})