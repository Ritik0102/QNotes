import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:9000";
  const noteIn = [];
  const [note, setNote] = useState(noteIn);
  const [user, setUser] = useState({email : "", password : ""})

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setNote(json)
  };

  const addNotes = async (title, description, date) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }, 
      body: JSON.stringify({ title, description, date }),
    });
    const notes = await response.json();
    setNote(note.concat(notes));
  };

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json);

    let newNotes = note.filter((notes) => {
      return notes._id !== id;
    });
    setNote(newNotes);
  };



  const editNote = async(id, title, description) => {
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }, 
      body: JSON.stringify({ title, description }),
    });

    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(note));

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        break;
      }
    }
    setNote(newNotes)
  };

  const addUser = async( username, email, password ) =>{
    const response = await fetch(`${host}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        }, 
      body: JSON.stringify({ username, email, password }),
    });
    const json = await response.json();
    console.log(json);
  }

  // const getUser = async() =>{
  //   const response = await fetch(`${host}/api/auth/getuser`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token":
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxMmJkZDk2NzE2YTQ4NmZlOTVmNjdkIn0sImlhdCI6MTY5NTgwODgwNn0.ZR6czs-H2-Fwpyui1khpoPTSpv4htg8iyYtlJQ__sB4",
  //     },
  //   });
  //   const json = await response.json();
  //   console.log(json)
  // }

  // const login = async(email, password) =>{
  //   const response = await fetch(`${host}/api/auth/login`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       }, 
  //     body: JSON.stringify({ email, password }),
  //   });
  //   const json = await response.json();
  //   console.log(json);
  // }



  return (
    <NoteContext.Provider
      value={{ note, setNote, addNotes, deleteNote, getNotes, editNote, addUser, user, setUser }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
