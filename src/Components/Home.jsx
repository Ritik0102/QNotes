import React from "react";
import NoteContainer from "./NoteContainer";

function Home(props) {
  const {showAlert}=props;
  return (
    <div className="container">
      <h1>QNotes</h1>
      <div className="row">
        <NoteContainer showAlert = {showAlert} />
      </div>
    </div>
  );
}

export default Home;
