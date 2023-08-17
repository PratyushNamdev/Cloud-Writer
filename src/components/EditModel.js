import React, { useContext } from "react";
import NoteContext from "./context/Notes-Context/NoteContext";

export default function EditModel(props) {
  const { editModel, setEditModel} = props;
  const {editNote , setEditNote , updateNote} = useContext(NoteContext);

  const handleChange = (e) => {
    setEditNote({...editNote , [e.target.name] : e.target.value})
  };
  const handleSubmit = () => {
      updateNote(editNote._id , editNote.title , editNote.tag , editNote.description );
  };
  const MODEL_STYLES = {
    position: "fixed",
    overflowY: "scroll",
    width: "100%",
    padding: "1em",
    zIndex: "1000",
  };

  // const OVERLAY_STYLE = {
  // position:"fixed",
  // top:'0',
  // left:'0',
  // right:"0",
  // button:"0",
  // backgroundColor:"rgba(0 , 0 , 0, 0.7)",
  // zIndex:"1000"
  // }
  
  if (!editModel) return null;

  return (
    <>
      <div style={MODEL_STYLES}>
        <div className="editnote_container edit_Note">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h1>Edit a Note </h1>
            <button
              style={{
                border: "none",
                width: "20px",
                backgroundColor: "#FFFFFF",
              }}
              onClick={() => {
                setEditModel(false);
              }}
            >
              X
            </button>
          </div>
          <form>
            <div className="title_tag_container">
              <div className="title_div addnote_child">
                <h3>Title</h3>
                <input
                  value={editNote.title}
                  type="text"
                  className="input"
                  name="title"
                  onChange={handleChange}

                />
              </div>
              <div className="tag_div addnote_child">
                <h3>Tag</h3>
                <input
                value={editNote.tag}
                  type="text"
                  className="input"
                  name="tag"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="description_div addnote_child">
              <h3>Description</h3>
              <textarea
               value={editNote.description}
                name="description"
                id="description"
                cols="30"
                rows="5"
                onChange={handleChange}
              ></textarea>
            </div>
          </form>
          <button className="submit_btn" onClick={handleSubmit}>
            Save Edit
          </button>
        </div>
      </div>
    </>
  );
}
