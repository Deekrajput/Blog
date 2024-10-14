import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import blogcontext from '../../context/blogcontext';
import style from './style.module.css'; // Ensure this import is correct

const UpdatePostForm = () => {
  const { currentPost, updatePost } = useContext(blogcontext);
  const [title, setTitle] = useState(currentPost?.title || '');
  const [content, setContent] = useState(currentPost?.content || '');
  const [image, setImage] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update the post and wait for the response
    await updatePost(currentPost._id, title, content, image);
    
    // Redirect to the profile page after the update
    navigate('/profile');
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the selected file
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <label className={style.formLabel}>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={style.formControl}
        />
      </label>
      <label className={style.formLabel}>
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className={style.formControl}
        />
      </label>
      <label className={style.formLabel}>
        Image:
        <input
          type="file"
          accept="image/*" // Only accept image files
          onChange={handleImageChange}
          className={style.formControl}
        />
      </label>
      <button type="submit" className={style.btnPrimary}>Update Post</button>
    </form>
  );
};

export default UpdatePostForm;
