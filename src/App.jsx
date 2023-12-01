import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup";
import Alert from "./Components/Alert";

function App() {
  const [alert, setAlert] = useState(null)

  const showAlert = (msg, type) =>{
    setAlert( {
      msg : msg,
      type : type
    } )

    setTimeout(() =>{
      setAlert(null)
    },1500)
  }
  return (
    <>
      <BrowserRouter>
      <NoteState>
        <Navbar />
        <Alert alert={alert}/>
        <Routes>
          <Route path="/" element={localStorage.getItem('token') ? <Home showAlert={showAlert} />:<Login showAlert={showAlert}/>}/>
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login showAlert={showAlert} />}/>
          <Route path="/signup" element={<Signup showAlert={showAlert} />}/>
        </Routes>
      </NoteState>
      </BrowserRouter>
    </>
  );
}

export default App;
