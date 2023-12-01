import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import Notes from "./Notes";
import AddNotes from "./AddNotes";

function NoteContainer(props) {
  const context = useContext(NoteContext);
  const { note, getNotes, editNote} = context;
  const {showAlert} = props;


  useEffect(()=>{
    getNotes()
  },[])

  const ref = useRef(null);
  const refClose = useRef(null);
  const [notes, setNotes] = useState({ etitle: "", edescription: "" });

  const updateNote = (currentnotes) => {
    ref.current.click();
    setNotes({id: currentnotes._id, etitle: currentnotes.title, edescription: currentnotes.description})
  };

  const handleChange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(notes.id, notes.etitle, notes.edescription)
    console.log("updating note...")
    refClose.current.click();
    showAlert("Note Updated", "success")
  };

  return (
    <>
      <AddNotes showAlert={showAlert}/>
      <button
        ref = {ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="etitle"
                  value={notes.etitle}
                  onChange={handleChange}
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Title"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Description
                </label>
                <textarea
                  className="form-control"
                  name="edescription"
                  value={notes.edescription}
                  onChange={handleChange}
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                ref = {refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" onClick={handleClick} className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <h2>My Notes</h2>
      <div className="row my-3">
        {note?.length > 0 ?
          (note.map((notes) => {
          return (
            <Notes
              key={notes._id}
              updateNote = {updateNote}
              notes={notes}
              showAlert={showAlert}
            />
          );
        })):(
          <h5>No Notes To Display</h5>
        )
        }
      </div>
    </>
  );
}

export default NoteContainer;
