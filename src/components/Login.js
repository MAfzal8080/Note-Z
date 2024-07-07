import React, { useEffect, useState } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""})
    let navigate = useNavigate();

    useEffect(() => {
      document.title = 'Note-Z | Login';
    }, []);

    const handleChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const handleLogin = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        if(json.success){
            localStorage.setItem('token', json.authtoken);
            navigate("/home");
            props.showAlert("Logged in successfully", "success")
        }
        else{
          props.showAlert("invalid credentials", "danger")
        }
    }
  return (
    <div className='container'>
      <div className="container h5 text-primary p-3 bg-info bg-opacity-10 border border-info border-start-0 rounded-end formBox">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Enter E-mail</Form.Label>
          <Form.Control type="text" placeholder="Enter your email" id='email' name='email' onChange={handleChange} value={credentials.email} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control type="text" placeholder="Enter you password" id='password' name='password' onChange={handleChange} value={credentials.password} required />
        </Form.Group>
        <Button type="submit" onClick={handleLogin} >
          Login
        </Button>
      </Form>
      </div>
    </div>
  )
}

export default Login
