import express from "express";
import authMiddleware from "../middleware/auth.js";
import Note from "../models/note.js";

const router = express.Router();

// let notes = [];

// get user notes
router.get("/", authMiddleware, async (req,res)=>{
    try{
        const notes = await Note.find({ user: req.userId });
        res.json(notes);
    } catch (error){
        res.status(500).json({ message: "Server error"});
    }
});

// create note
router.post("/", authMiddleware, async (req,res) => {
    try{
        const {text} = req.body;

        const newNote = new Note({
            text,
            user: req.userId,
        });
        
        await newNote.save();
        res.status(201).json(newNote);
    }catch (error){
        res.status(500).json({ messasge: "Server error"});
    }
    
});


// delete note
router.delete("/:id", authMiddleware, async (req, res)=> {
    try{
        await Note.findOneAndDelete({
            _id: req.params.id,
            user: req.userId,
        });
        res.json({ message: "Note deleted."});
    }catch (error){
        res.status(500).json({message: "Server error"});
    }
});

// codes moved from index.js

// get all notes
// app.get("/notes", async(req,res)=>{
//     const notes = await Note.find();
//     res.json(notes);
// });

// // post new note
// app.post("/notes", async(req,res) => {
//     const newNote = new Note({text: req.body.note});
//     await newNote.save();
//     res.json({message: "Note saved to DB"});
// });


// // delete note
// app.delete("/notes/:id", async (req, res) => {
//     await Note.findByIdAndDelete(req.params.id);
//     res.json({message:"Note deleted"});
// });

export default router;