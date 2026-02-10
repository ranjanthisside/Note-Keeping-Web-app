
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js"
import notesRoutes from "./routes/notes.js";

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/notes", notesRoutes);

// mongodb connection
const MONGO_URI = process.env.MONGO_URI;
mongoose
.connect(MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch((err) => console.log("DB Error: ", err));

app.get("/",(req, res)=> {
    res.send("Api Running successfully");
});

// schema and model
// const noteSchema = new mongoose.Schema({
//     text:String,
// });

// const Note = mongoose.model("Note", noteSchema);

// starting server
app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
})