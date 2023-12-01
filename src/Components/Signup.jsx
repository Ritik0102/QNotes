import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";

const Signup = (props) => {
  const [users, setUsers] = useState({});
  const context = useContext(NoteContext);
  const { addUser } = context;
  const {showAlert} = props;

  const handleClick = (e) => {
    e.preventDefault();
    addUser(users.username, users.email, users.password);
    showAlert("Account Created Successfully", "success")
  };

  const handleChange = (e) => {
    setUsers({...users,[e.target.name]:e.target.value})
  }
  return (
    <div className="container col-md-6">
      <h3 className="my-3 text-center">Sign Up</h3>
      <form>
        <div className="row mb-4">
          <div className="col">
            <div className="form-outline">
              <label className="form-label" htmlFor="form3Example1">
                Username
              </label>
              <input type="text" name="username" onChange={handleChange} id="form3Example1" className="form-control" required />
            </div>
          </div>
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example3">
            Email address
          </label>
          <input type="email" name="email" onChange={handleChange} id="form3Example3" className="form-control" required />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example4">
            Password
          </label>
          <input type="password" name="password" onChange={handleChange} id="form3Example4" className="form-control" required minLength={5}/>
        </div>
        <div className="text-center">
          <button type="submit" onClick={handleClick} className="btn btn-primary btn-block mb-4">
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
