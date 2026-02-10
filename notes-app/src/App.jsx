import {useState, useEffect} from "react";
import './App.css';

const API_URL = "https://note-keeping-web-app.onrender.com/notes";

function App(){
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  // load notes from backend
  useEffect(()=> {
    fetch(API_URL)
    .then((res) => res.json())
    .then((data) => setNotes(data))
    .catch((err) => console.error(err));
  }, []);


// add note
  const addNote = async () => {
    if (!note.trim()) return;
    await fetch(API_URL, {
      method:"POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({note}),
    });

    setNote("");

    // reload notes
    const res = await fetch(API_URL);
    const data = await res.json();
    setNotes(data);
  };
  

  // DELETE NOTES
  const deleteNote = async(id) => {
    await fetch(`${API_URL}/${id}`,{
      method:"DELETE",
    });

    //reload notes
    const res = await fetch(API_URL);
    const data = await res.json();
    setNotes(data);
  };

  

  return (
    <div className = "container">
      <p className="logo"> Notes App</p>
      <div className = "input-box">
        <input
        type = "text"
        placeholder= "Write a note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onKeyDown = {(e) =>{
          if (e.key === "Enter") addNote();
        }}
        />
        <button onClick={addNote}>Add</button>
        
      </div>

      <ul className="note-items" >
        {notes.map((n)=> (
          <li key={n._id}>
            {n.text}
            <button id="deleteButton" onClick = {() => deleteNote(n._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
