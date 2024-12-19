import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import blogContext from '../../context/blogcontext';
import styles from './style.module.css';

const Profile = () => {
    const context = useContext(blogContext);
    const { blogp, getPosts, deletePost, setCurrentPostData } = context;
    const navigate = useNavigate();

    useEffect(() => {
        getPosts();
    }, [getPosts]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/login');
    };

    const handleCreatePost = () => {
        navigate('/createpost');
    };

    const handleUpdatePost = (post) => {
        setCurrentPostData(post);
        navigate('/update');
    };

    return (
        <div className={styles.profile_container}>
            <nav className={styles.navbar}>
                <h1>Blogs</h1>
                <div className={styles.nav_buttons}>
                    <button className={styles.create_btn} onClick={handleCreatePost}>
                        Create Post
                    </button>
                    <button className={styles.white_btn} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
            <div className={styles.profile_details}>
                <h2>Your Blogs</h2>
                {blogp.length === 0 ? (
                    <div className={styles.empty_state}>
                        <h3>No Posts Available</h3>
                        <p>You haven't created any blog posts yet. Start by creating your first post!</p>
                    </div>
                ) : (
                    blogp.map((post) => (
                        <div key={post._id} className={styles.blog_post}>
                            <div className={styles.blog_content}>
                                <h3>{post.title}</h3>
                                <p className={styles.blog_date}>{post.date}</p>
                                {post.image && (
                                    <div className={styles.image_container}>
                                        <img 
                                            src={`http://localhost:5000${post.image}`} 
                                            alt={post.title} 
                                            className={styles.blog_image} 
                                            onError={(e) => { e.target.onerror = null; e.target.src='path_to_placeholder_image'; }} 
                                        />
                                    </div>
                                )}
                                <p>{post.content}</p>
                                <div className={styles.blog_buttons}>
                                    <button className={styles.update_btn} onClick={() => handleUpdatePost(post)}>
                                        Update
                                    </button>
                                    <button className={styles.delete_btn} onClick={() => deletePost(post._id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Profile;
