import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const initialBlogs = [];
  const [blogs, setBlogs] = useState(initialBlogs);
  const fetchBlog = async (title, description, tag) => {
    const response = await fetch(`https://note-z-backend.onrender.com/blog/fetchblog`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setBlogs(json);
  };
  const addBlog = async (title, description, tag) => {
    //eslint-disable-next-line
    const response = await fetch(`https://note-z-backend.onrender.com/blog/addblog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag})
    });
    const blog = await response.json()
    setBlogs(blogs.concat(blog));
  };

  const editBlog = async (id, title, description, tag) => {
    //eslint-disable-next-line
    const response = await fetch(
      `https://note-z-backend.onrender.com/blog/updateblog/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
          localStorage.getItem('token'),
        },
        body: JSON.stringify({title, description, tag}),
      }
    );
    let newBlog = JSON.parse(JSON.stringify(blogs))
    for (let index = 0; index < newBlog.length; index++) {
      const e = blogs[index];
      if (e._id === id) {
        newBlog[index].title = title;
        newBlog[index].description = description;
        newBlog[index].tag = tag;
        break;
      }
    }
    setBlogs(newBlog);
  };

  const deleteBlog = async (id) => {
    const response = await fetch(
      `https://note-z-backend.onrender.com/blog/deleteblog/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
          localStorage.getItem('token'),
        },
      }
    );
    //eslint-disable-next-line
    const json = await response.json();

    const newBlogs = blogs.filter((blog) => {
      return blog._id !== id;
    });
    setBlogs(newBlogs);
  };

  return (
    <NoteContext.Provider
      value={{ blogs, setBlogs, addBlog, editBlog, fetchBlog, deleteBlog }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
