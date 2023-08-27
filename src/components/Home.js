import React, { useContext, useEffect } from "react";
import NoteContext from "./context/Notes-Context/NoteContext";
import "./Style/fetchednotes.css";
import AddNote from "./AddNote";
import FetchedNotes from "./FetchedNotes";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import EditModel from "./EditModel";
import Loading from "./Loading";

export default function Home() {
  const {
    notes,
    fetchNotes,
    editModel,
    setEditModel,
    totalNotes,
    isLoading,
  } = useContext(NoteContext);

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
      <EditModel editModel={editModel} setEditModel={setEditModel}></EditModel>
      <AddNote />
      {isLoading && <Loading />}
      {notes.length > 0 && (
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Your Notes
        </h1>
      )}
      <InfiniteScroll
        dataLength={notes.length}
        next={fetchNotes}
        hasMore={totalNotes !== notes.length}
        Loader={<h1>Loading........</h1>}
        inverse={false}
      >
        <div className="fetchednotes_container">
          {notes.map((notes) => {
            return <FetchedNotes key={notes._id} notes={notes} />;
          })}
        </div>
      </InfiniteScroll>
    </>
  );
}
