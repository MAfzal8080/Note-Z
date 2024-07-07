import React from 'react'
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";

function ColorSchemesExample(props) {
    let navigate = useNavigate();
    const handleLogout = ()=>{
      localStorage.removeItem('token')
      navigate("/login")
      props.showAlert("Logged out successfully", "success")
    }
  return (
    <>
      <Navbar bg="dark" variant="dark" className='w-100'>
        <Container>
          <Navbar.Brand to="/">Note-Z</Navbar.Brand>
          {/* <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/"?"active":""}`} to="Home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/contact"?"active":""}`} to="Contact">Contact</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="About">About</Link>
            </li>
          </ul> */}
          {!localStorage.getItem('token') ? <div className="d-flex">
            <Link className="btn btn-primary mx-2" to="/Login">Login</Link>
            <Link className="btn btn-primary" to="/Signup">Signup</Link>
          </div> : <button className="btn btn-primary" onClick={handleLogout}>Logout</button> }
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
