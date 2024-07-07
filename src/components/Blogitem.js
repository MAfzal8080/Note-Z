import React, { useContext } from 'react'
import NoteContext from "../context/noteContext";
import { FaTrash, FaEdit } from "react-icons/fa";

const Blogitem = (props) => {
  const context = useContext(NoteContext)
  const {deleteBlog} = context;
  const { blog, updateblog } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body"> 
            <div className="d-flex align-item-center">
              <h5 className="card-title">{blog.title}</h5>
              <FaTrash className="m-2" onClick={()=>{deleteBlog(blog._id) && props.showAlert("Blog has removed successfully", "success")}} /><FaEdit className="m-2" onClick={()=>{updateblog(blog)}} />
            </div>
          <p className="card-text">{blog.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Blogitem;
