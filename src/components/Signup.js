import React, { useEffect, useState } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name: "", email: "", password: ""});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Note-Z | Sign up';
  }, []);

  const handleChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
    if (credentials.cpassword !== credentials.password) {
      setError("Password does not match");
    }else{
      setError("");
    }
  }
  const handleSignup = async (e)=>{
    e.preventDefault()
    const {name , email, password} = credentials;
    const response = await fetch("http://localhost:5000/auth/createuser",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    });
    const json = await response.json();
    if(json.success){
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showAlert("Your account has been created successfully", "danger")
    }
    else{
      props.showAlert("invalid credentials", "danger")
    }
  }
  return (
    <div className='container'>
      <div className="container h5 p-3 bg-info bg-opacity-10 border border-info border-start-0 rounded-end formBox">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Enter Your name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" id='name' name='name' onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Enter Your E-mail</Form.Label>
          <Form.Control type="text" placeholder="Enter your email" id='email' name='email' onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control type="password" placeholder="Enter you password" id='password' name='password' onChange={handleChange} minLength={5} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm password" id='cpassword' name='cpassword' onChange={handleChange} minLength={5} required />
          <p style={{color:'red', fontWeight:'100'}}>{error}</p>
        </Form.Group>
        <Button type="submit" onClick={handleSignup} className="m-1" >
          Signup
        </Button>
        <Button type="reset" className="m-1" >Reset</Button>
      </Form>
      </div>
    </div>
  )
}

export default Signup
