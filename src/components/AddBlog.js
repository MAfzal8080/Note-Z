import React, {useContext, useState} from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NoteContext from "../context/noteContext";

const AddBlog = (props) => {
    
    const context = useContext(NoteContext)
    const {addBlog} = context;
    const [blog, setBlog] = useState({title : '', description : '', tag : ''})
    const handleAddBlog = (e)=>{
        e.preventDefault();
        addBlog(blog.title, blog.description, blog.tag)
        setBlog({title : '', description : '', tag : ''})
        props.showAlert("Blog added successfully", "success")
    }
    const handleChange = (e)=>{
        setBlog({...blog, [e.target.name]: e.target.value})
    }
  return (
    <div>
      <div className="container p-3 h5 bg-info bg-opacity-10 border border-info border-start-0 rounded-end">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter title of note" id='title' name='title' onChange={handleChange} minLength={5} value={blog.title} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Note</Form.Label>
          <Form.Control type="text" placeholder="Start writing note" id='description' name='description' onChange={handleChange} value={blog.description} minLength={5} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tags</Form.Label>
          <Form.Control type="text" placeholder="Enter tags for note" id='tag' name='tag' onChange={handleChange} value={blog.tag} minLength={5} required />
        </Form.Group>
        <Button disabled={blog.title.length < 5 || blog.description.length < 5} type="submit" onClick={handleAddBlog} className="m-1">
          Submit
        </Button>
        <Button type="reset" className="m-1" >Reset</Button>
      </Form>
      </div>
    </div>
  )
}

export default AddBlog
