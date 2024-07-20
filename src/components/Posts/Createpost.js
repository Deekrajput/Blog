import React, { useState, useContext } from 'react';
import blogContext from '../../context/blogcontext';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';

const CreatePost = () => {
  console.log("CreatePost component rendered");
    const { addPosts } = useContext(blogContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addPosts(title, content);
        setTitle('');
        setContent('');
        navigate('/profile'); // Redirect to profile after adding post
    };

    return (
        <div className={styles.createPostContainer}>
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                    className={styles.input}
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                    required
                    className={styles.textarea}
                />
                <button type="submit" className={styles.button}>Create Post</button>
            </form>
        </div>
    );
};

export default CreatePost;
