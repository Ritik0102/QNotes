import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem('token');
    navigate('/login')
  }
  const location = useLocation();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to={localStorage.getItem('token') ? "/" : '/login'}>
            QNotes
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname == "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to={localStorage.getItem('token') ? "/" : '/login'}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname == "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {!localStorage.getItem('token') ? <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <Link
            className= "btn btn-primary mx-1"
            style={{display : `${location.pathname == "/login" ? "none" : ""}`}}
            role="button"
            aria-disabled="true"
            to= "/login"
          >
            Login
          </Link>
          <Link
            className="btn btn-primary mx-1"
            style={{display : `${location.pathname == "/signup" ? "none" : ""}`}}
            role="button"
            aria-disabled="true"
            to= '/signup'
          >
            SignUp
          </Link>
        </div>
        :
        <button className="btn btn-primary" onClick={handleLogout}>Logout</button>}
      </nav> 
    </div>
  );
}

export default Navbar;
