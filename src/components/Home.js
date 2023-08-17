import React, { useContext, useEffect } from "react";
import NoteContext from "./context/Notes-Context/NoteContext";
import "./Style/fetchednotes.css";
import AddNote from "./AddNote";
import FetchedNotes from "./FetchedNotes";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
import EditModel from "./EditModel";
import AuthContext from "./context/auth/AuthContext";
export default function Home() {
  const { notes, fetchNotes, alert , editModel , setEditModel  } = useContext(NoteContext);
  const {userName} = useContext(AuthContext);
  let navigate = useNavigate();
  
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      if (notes.length === 0) {
        fetchNotes();
      }
    }

    // eslint-disable-next-line
  }, []);
  
  return (
    <>
      <EditModel editModel={editModel} setEditModel = {setEditModel}></EditModel>
      <AddNote />
      <Alert message={alert} />
    
      
      
      
      {notes.length > 0 && (
        <h1
          style={{
            textAlign: "center",
          }}
        >
          {userName}'s Notes
        </h1>
      )}

      <div className="fetchednotes_container">
        {notes.map((notes) => {
          return <FetchedNotes key={notes._id} notes={notes} />;
        })}
      </div>
    </>
  );
}
