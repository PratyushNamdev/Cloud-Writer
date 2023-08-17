import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  //the notes state hold all the notes from the database
  const [notes, setNotes] = useState([]);
  const [alert, setAlert] = useState("");
  const [editModel , setEditModel] = useState(false);
  const [editNote , setEditNote] = useState({});
  const UpdateMessage = (text) => {
    setAlert(text);
    setTimeout(() => {
      setAlert("");
    }, 2000);
  };

  //Fetching the notes from the Server
  const fetchNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET", //using post method coz we are posting data in the DB
      headers: {
        "content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
         
        //auth-token to verify the user
      },
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //Adding a new note and also dispalying it to the user
  const addNote = async (title = "", tag = "", description = "") => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", //using post method coz we are posting data in the DB
      headers: {
        "content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
        //auth-token to verify the user
      },
      body: JSON.stringify({ title, tag, description }),
    });
    const note = await response.json();

    //adding the new note in the notes state so that it can be render onn user interface
    setNotes(notes.concat(note));
    UpdateMessage("Added");
  };

  //Deleting a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", //using Delete method coz we are deleting data in the DB
      headers: {
        "content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
        //auth-token to verify the user
      },
    });
    const data = await response.json();
    if (data.Delete) {
      const newNotes = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(newNotes);
      UpdateMessage("Deleted");
    }
  };

  const updateNote = async (id, title, tag , description) => {
    
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", //using PUT method coz we are Updating data in the DB
      headers: {
        "content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
        //auth-token to verify the user
      },
      body: JSON.stringify({ title , description , tag })
    });
    const note = await response.json();
    console.log(note)
    if (!note.error) {
      let newNotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < notes.length; index++) {
        if (notes[index]._id === id) {
          newNotes[index].title = title;
          newNotes[index].tag = tag;
          newNotes[index].description = description;
          break;
        }
      }
      setNotes(newNotes);
      setEditModel(false);
    }
  };
  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        fetchNotes,
        deleteNote,
        alert,
        updateNote,
        editModel,
        setEditModel,
        editNote,
        setEditNote
        
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
