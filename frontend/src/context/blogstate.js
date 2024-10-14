import React, { useState, useEffect } from 'react';
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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': getAuthToken(),
        },
      });

      if (response.ok) {
        const json = await response.json();
        setBlogp(Array.isArray(json) ? json : []);
      } else {
        console.error('Failed to fetch posts:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Add a Post with an image
  const addPost = async (title, content, image) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image); // Append image if provided
    }

    try {
      const response = await fetch(`${host}/api/post/createpost`, {
        method: 'POST',
        headers: {
          'auth-token': getAuthToken(),
        },
        body: formData,
      });

      if (response.ok) {
        const post = await response.json();
        setBlogp((prevBlogp) => [...prevBlogp, post]);
      } else {
        console.error('Failed to create post:', response.statusText);
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
        setBlogp((prevBlogp) => prevBlogp.filter((post) => post._id !== postId));
      } else {
        console.error('Failed to delete the post:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // Update a Post
  const updatePost = async (id, title, content, image) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image); // Append image if provided
    }

    try {
      const response = await fetch(`${host}/api/post/updatepost/${id}`, {
        method: 'PUT',
        headers: {
          'auth-token': getAuthToken(),
        },
        body: formData,
      });

      if (response.ok) {
        const json = await response.json();
        setBlogp((prevBlogp) =>
          prevBlogp.map((post) =>
            post._id === id ? { ...post, title, content, image: json.image || post.image } : post
          )
        );
      } else {
        console.error('Failed to update the post:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  // Set current post data
  const setCurrentPostData = (post) => {
    setCurrentPost(post);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <blogcontext.Provider value={{ blogp, getPosts, addPost, deletePost, updatePost, setCurrentPostData, currentPost }}>
      {props.children}
    </blogcontext.Provider>
  );
};

export default BlogState;
