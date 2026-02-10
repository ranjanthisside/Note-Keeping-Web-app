import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

console.log("API URL:", import.meta.env.VITE_API_URL);


const API_URL = `${import.meta.env.VITE_API_URL}/notes`;

export default function Notes() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");


  // 🔐 redirect to login if no token
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchNotes();
  }, [token, navigate]);

  // 📥 load notes
//   const fetchNotes = async () => {
//     try {
//       const res = await fetch(API_URL, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       setNotes(data);
//     } catch (err) {
//       console.error("Error fetching notes", err);
//     }
//   };

//   useEffect(() => {
//     if (token) fetchNotes();
//   }, [token]);

const fetchNotes = async () => {
  const token = localStorage.getItem("token"); // ← moved here

  if (!token) {
    navigate("/login");
    return;
  }

  try {
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }

    const data = await res.json();
    setNotes(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Error fetching notes", err);
  }
};


  // ➕ add note
 const addNote = async () => {
  const token = localStorage.getItem("token"); // ← add this
  if (!note.trim()) return;

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text: note }),
  });

  setNote("");
  fetchNotes();
};


  // ❌ delete note
  const deleteNote = async (id) => {
  const token = localStorage.getItem("token"); // ← add this

  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  fetchNotes();
};


  // 🚪 logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container">
      <p className="logo">Notes App</p>

      <button className="homepageButton" onClick={logout} style={{ marginBottom: 20 }}>
        Logout
      </button>

      <div className="input-box">
        <input
          type="text"
          placeholder="Write a note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addNote();
          }}
        />
        <button className="homepageButton" onClick={addNote}>Add</button>
      </div>

      <ul className="note-items">
        {notes.map((n) => (
          <li key={n._id}>
            {n.text}
            <button id="deleteButton" className="homepageButton" onClick={() => deleteNote(n._id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}


// import {useState, useEffect} from "react";
// import {useNavigate } from "react-router-dom";
// import './App.css';

// // const API_URL = "https://note-keeping-web-app.onrender.com/notes";
// const API_URL = "http://localhost:5000/notes";

// function App(){
//   const [note, setNote] = useState("");
//   const [notes, setNotes] = useState([]);

//   // load notes from backend
//   useEffect(()=> {
//     fetch(API_URL)
//     .then((res) => res.json())
//     .then((data) => setNotes(data))
//     .catch((err) => console.error(err));
//   }, []);


// // add note
//   const addNote = async () => {
//     if (!note.trim()) return;
//     await fetch(API_URL, {
//       method:"POST",
//       headers: {"Content-Type":"application/json"},
//       body: JSON.stringify({note}),
//     });

//     setNote("");

//     // reload notes
//     const res = await fetch(API_URL);
//     const data = await res.json();
//     setNotes(data);
//   };
  

//   // DELETE NOTES
//   const deleteNote = async(id) => {
//     await fetch(`${API_URL}/${id}`,{
//       method:"DELETE",
//     });

//     //reload notes
//     const res = await fetch(API_URL);
//     const data = await res.json();
//     setNotes(data);
//   };

  

//   return (
//     <div className = "container">
//       <p className="logo"> Notes App</p>
//       <div className = "input-box">
//         <input
//         type = "text"
//         placeholder= "Write a note..."
//         value={note}
//         onChange={(e) => setNote(e.target.value)}
//         onKeyDown = {(e) =>{
//           if (e.key === "Enter") addNote();
//         }}
//         />
//         <button onClick={addNote}>Add</button>
        
//       </div>

//       <ul className="note-items" >
//         {notes.map((n)=> (
//           <li key={n._id}>
//             {n.text}
//             <button id="deleteButton" onClick = {() => deleteNote(n._id)}>❌</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;



