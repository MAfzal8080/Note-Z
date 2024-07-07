import React, { useEffect } from "react";
import Blogs from "./Blogs";
import { useNavigate } from "react-router-dom";

export default function Home(props) {
  const {showAlert} = props;
  const navigate = useNavigate();
  useEffect(() => {
    
    if(!localStorage.getItem('token')) navigate('/login')

  }, [])
  

  return (
    <div className="container">
      
      <Blogs showAlert = {showAlert} />
    </div>
  );
}
