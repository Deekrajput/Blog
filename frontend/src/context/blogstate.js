import React, { useState } from 'react';
import blogcontext from './blogcontext';

const BlogState = (props) => {

  // const host = 'https://vercel.live/link/blog-pmc7-deekshas-projects-a29404f9.vercel.app?via=project-dashboard-alias-list&p=1'|| 'http://localhost:5000';
  const host = 'http://localhost:5000';

  const [blogp, setBlogp] = useState([]); // Initialize as an empty array
  const [currentPost, setCurrentPost] = useState(null);

  // Function to get the auth token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // Get all Posts
  const getPosts = async () => {
    try {
      const response = await fetch(`${host}/api/post/allposts`, {
        method: 'POST', // Ensure this matches your backend route
        headers: {
          'Content-Type': 'application/json',
          'auth-token': getAuthToken(),
        },
      });

      if (response.ok) {
        const json = await response.json();
        // Ensure json is an array
        setBlogp(Array.isArray(json) ? json : []);
      } else {
        console.error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Add a Post
  const addPosts = async (title, content) => {
    try {
      const response = await fetch(`${host}/api/post/createpost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': getAuthToken(),
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        const post = await response.json();
        setBlogp((prevBlogp) => [...prevBlogp, post]); // Create a new array
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  // Delete a Post
  const deletePost = async (postId) => {
    try {
      const response = await fetch(`${host}/api/post/deletepost/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': getAuthToken(),
        },
      });

      if (response.ok) {
        // Create a new array excluding the deleted post
        setBlogp((prevBlogp) => prevBlogp.filter((post) => post._id !== postId));
      } else {
        console.error('Failed to delete the post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // Update a Post
  const updatePost = async (id, title, content, image) => {
    try {
      const response = await fetch(`${host}/api/post/updatepost/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': getAuthToken(),
        },
        body: JSON.stringify({ title, content, image }),
      });

      if (response.ok) {
        const json = await response.json();

        setBlogp((prevBlogp) =>
          prevBlogp.map((post) =>
            post._id === id ? { ...post, title, content, image } : post
          )
        );
      } else {
        console.error('Failed to update the post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  // Set current post data
  const setCurrentPostData = (post) => {
    setCurrentPost(post);
  };

  return (
    <blogcontext.Provider value={{ blogp, getPosts, addPosts, deletePost, updatePost, setCurrentPostData, currentPost }}>
      {props.children}
    </blogcontext.Provider>
  );
};

export default BlogState;
