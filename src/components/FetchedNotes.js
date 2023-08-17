import React, { useContext } from "react";
import deleteimg from "./imgs/delete.png";
import editimg from "./imgs/edit.png";
import NoteContext from "./context/Notes-Context/NoteContext";


export default function FetchedNotes(props) {
  const { deleteNote, setEditNote, setEditModel } = useContext(NoteContext);
  const handleDelete = () => {
    deleteNote(props.notes._id);
  };
  const handleEdit = () => {
    setEditModel(true);
    setEditNote(props.notes);
  };

  return (
    <div className="fetched_element">
      <div className="img-btn">
        <img
          src={deleteimg}
          alt="delete"
          width="20px"
          height="20px"
          style={{ margin: "8px" }}
          onClick={handleDelete}
        />
        <img
          src={editimg}
          alt="edit"
          width="20px"
          height="20px"
          onClick={handleEdit}
        />
      </div>
      <h4>{props.notes.title}</h4>
      <p>{props.notes.tag}</p>
      <p>{props.notes.description}</p>
    </div>
  );
}
