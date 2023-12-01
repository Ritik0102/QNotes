import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState({email:"", password:""});
  const {showAlert} = props;

  const handleChange = (e) => {
    setUsers({...users,[e.target.name]:e.target.value})
  }

  const handleClick = async(e) => {
    e.preventDefault();
      const response = await fetch(`http://localhost:9000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          }, 
        body: JSON.stringify({ email : users.email, password : users.password }),
      });
      const json = await response.json();
      console.log(json);

      if(json.success){
        localStorage.setItem('token', json.authToken)
        navigate("/")
        showAlert("Logged in Successfully", "success")
      }
      else{
        showAlert("Invalid Details", "danger")
      }
  };
  
  return (
    <div className="container col-md-6">
      <h3 className="my-3 text-center">LOGIN</h3>
      <form onSubmit={handleClick}>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form1Example1">
            Email address
          </label>
          <input type="email" name="email" onChange={handleChange} value={users.email} id="form1Example1" className="form-control" />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form1Example2">
            Password
          </label>
          <input type="password" name="password" onChange={handleChange} value={users.password} id="form1Example2" className="form-control" required minLength={3} />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
