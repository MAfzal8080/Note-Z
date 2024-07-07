import React, {useContext, useEffect, useState, useRef} from 'react'
import NoteContext from "../context/noteContext";
import Blogitem from "./Blogitem";
import AddBlog from "./AddBlog";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const Blogs = (props) => {
    const [blog, setBlog] = useState({id: '', etitle : '', edescription : '', etag : ''})
    let navigate = useNavigate();
    const context = useContext(NoteContext)
    const {blogs, fetchBlog, editBlog} = context;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const ref = useRef(null)
    const refClose = useRef(null)
    const handleUpdateBlog = (e)=>{
      e.preventDefault();
      editBlog(blog.id, blog.etitle, blog.edescription, blog.etag)
      refClose.current.click();
      props.showAlert("Updated successfully", "success")
  }
  const handleChange = (e)=>{
      setBlog({...blog, [e.target.name]: e.target.value})
  }
    useEffect(()=>{
      if(localStorage.getItem('token')){
        fetchBlog()
      }
      else{
        navigate("/home")
      }
      //eslint-disable-next-line
    },[])
    const updateblog = (currentBlog)=>{
      ref.current.click();
      setBlog({id: currentBlog._id, etitle: currentBlog.title, edescription: currentBlog.description, etag: currentBlog.tag})
    }
  return (
    <div className="row my-3" key={blogs.title}>
        <h3>Add Notes</h3>
        <AddBlog showAlert={props.showAlert} />
        <Button className='d-none' variant="primary" ref={ref} onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" id='etitle'  name='etitle' autoFocus onChange={handleChange} value={blog.etitle} minLength={5} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" id='edescription' name='edescription' value={blog.edescription} onChange={handleChange} rows={3}minLength={5} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tag</Form.Label>
              <Form.Control type="text" id='etag' name='etag' onChange={handleChange} value={blog.etag} minLength={5} required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" ref={refClose} onClick={handleClose}>
            Close
          </Button>
          <Button disabled={blog.etitle.length < 5 || blog.edescription.length < 5 || blog.etag.length < 3} variant="primary" onClick={handleUpdateBlog}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        <h3 className='my-3'>Your Notes</h3>
        <div className="container">
          {blogs.length === 0 && 'No Blogs to display'}
        </div>
        {blogs.map((blog)=>{
          return <Blogitem key={blog._id} updateblog={updateblog} blog={blog} showAlert = {props.showAlert} />;
        })}
      </div>
  )
}

export default Blogs
