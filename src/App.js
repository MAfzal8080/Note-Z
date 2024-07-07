import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import Contact from './components/Contact'
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import NoteState from './context/NoteState';
import Login from './components/Login';
import Alert from './components/Alert';
import Signup from './components/Signup';

function App() {
  const  [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
    <NoteState>
    <Router>
      <Navbar showAlert={showAlert} />
      <Alert alert = {alert} />
      <Routes>
        <Route path='/' element={<Login showAlert = {showAlert} />} />
        <Route path='/home' element={<Home showAlert = {showAlert} />} />
        <Route path='/about' element={<About showAlert = {showAlert} />} />
        <Route path='/contact' element={<Contact showAlert = {showAlert}/>} />
        <Route path='/login' element={<Login showAlert = {showAlert} />} />
        <Route path='/signup' element={<Signup  showAlert = {showAlert} />} />
      </Routes>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
