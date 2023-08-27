import React, { useState } from "react";
import NoteContext from "./NoteContext";
import { toast } from "react-hot-toast";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  //the notes state hold all the notes from the database
  const [notes, setNotes] = useState([]);
  const [editModel , setEditModel] = useState(false);
  const [editNote , setEditNote] = useState({});
  const [page , setPage] = useState(0);
 const [totalNotes , setTotalNotes]=useState(0);
 const [isLoading , setIsLoading] = useState(false)
  //Fetching the notes from the Server
  const fetchNotes = async () => {
    try{ 
      const response = await fetch(`${host}/api/notes/fetchnotes?page=${page}&limit=5`, {
        method: "GET", //using post method coz we are posting data in the DB
      headers: {
        "content-Type": "application/json",
        "auth-token": localStorage.getItem('token')        
        //auth-token to verify the user
      },
    });
    setPage((prevPage)=>prevPage+1)
    const data = await response.json();
    console.log(data.totalNotes);
    setTotalNotes(data.totalNotes);
   
    setNotes(notes.concat(data.notes));
    
  }
  catch(e){
    toast.error("Cannot Fetch Notes ! Server error")
  }
  };

  //Adding a new note and also dispalying it to the user
  const addNote = async (title = "", tag = "", description = "") => {
    try{
      setIsLoading(true);
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
   setIsLoading(false);
    toast.success('Added!',
    {
      icon: '👏',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })}
    catch(e){
      toast.error("Failed !")
      isLoading(false)
    }
   
  };

  //Deleting a note
  const deleteNote = async (id) => {
 try{  setIsLoading(true);
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
      setIsLoading(false);
      toast.success('Deleted!',
      {
        icon: '🛑',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
    }}
    catch(e){
      setIsLoading(false);
      toast.error("Can't be deleted !")
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
      toast.success('Updated!',
    {
      icon: '👏',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })
    }
    else{
      toast.error("Something went wrong !")
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
        updateNote,
        editModel,
        setEditModel,
        editNote,
        setEditNote,
        totalNotes,
        isLoading,
        setPage,
        setIsLoading
        
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
