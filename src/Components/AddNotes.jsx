import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";

const AddNotes = (props) => {
    const [notes, setNotes] = useState({title : "", description : ""})
    const {showAlert} = props;

    const context = useContext(NoteContext);
    const { addNotes } = context;

    const handleClick = (e) => {
        e.preventDefault();
        addNotes(notes.title, notes.description)
        setNotes({title : "", description : ""})
        showAlert("Note Added", "success")
    }

    const handleChange = (e) => {
        setNotes({...notes, [e.target.name]:e.target.value})
        
    }
  return (
    <>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Title
        </label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={notes.title}
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Title"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          name="description"
          onChange={handleChange}
          value={notes.description}
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
        <div className="col-auto my-3">
          <button type="submit" onClick={handleClick} className="btn btn-primary mb-3">
            Add Note
          </button>
        </div>
      </div>
    </>
  );
};

export default AddNotes;
