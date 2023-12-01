import React, { useContext } from "react";
import deleteIcon from '../assets/delete.png'
import editIcon from '../assets/edit.png'
import NoteContext from "../context/notes/noteContext";


function Notes(props) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { notes, updateNote } = props;

  

  // const formatDate = (value) => {
  //   if (!value) return "";

  //   const date = new Date(value);
  //   const monthName = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "July",
  //     "Aug",
  //     "Sept",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ];

  //   let hrs = date.getHours();
  //   hrs = hrs > 12 ? 24 - hrs : hrs;
  //   let amPm = hrs >= 12 ? "PM" : "AM";
  //   hrs = hrs ? hrs : "12";

  //   let min = date.getMinutes();
  //   min = min < 10 ? "0" + min : min;

  //   let day = date.getDate();
  //   let month = monthName[date.getMonth()];

  //   return `${hrs}:${min} ${amPm} ${day} ${month} `;
  // };
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{notes.title}</h5>
          <p className="card-text">{notes.description}</p>
          <img onClick={()=>{deleteNote(notes._id); props.showAlert("Note Deleted", "success");}} src = {deleteIcon} alt = 'delete' />
          <img onClick={()=>{updateNote(notes)}} src = {editIcon} alt = 'edit'/>
        </div>
      </div>
    </div>
  );
}

export default Notes;
