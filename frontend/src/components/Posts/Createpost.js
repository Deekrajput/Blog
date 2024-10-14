import React, { useState, useContext } from 'react';
import blogContext from '../../context/blogcontext';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';

const CreatePost = () => {
    console.log("CreatePost component rendered");
    const { addPost } = useContext(blogContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null); // State for the image file
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addPost(title, content, image); // Pass the image to the addPost function
        setTitle('');
        setContent('');
        setImage(null); // Clear the image state
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
                <input
                    type="file" // File input for image
                    onChange={(e) => setImage(e.target.files[0])} // Store the file in state
                    className={styles.fileInput}
                />
                <button type="submit" className={styles.button}>Create Post</button>
            </form>
        </div>
    );
};

export default CreatePost;
