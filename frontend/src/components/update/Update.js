import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import blogContext from '../../context/blogcontext';
import styles from './style.module.css'; // Ensure the path is correct

const UpdatePost = React.forwardRef((props, ref) => {
    const context = useContext(blogContext);
    const { currentPost, updatePost } = context;
    const [post, setPost] = useState({ id: "", title: "", content: "", image: "" });
    const refClose = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentPost) {
            setPost({
                id: currentPost._id,
                title: currentPost.title,
                content: currentPost.content,
                image: currentPost.image
            });
        }
    }, [currentPost]);

    const handleClick = () => {
        updatePost(post.id, post.title, post.content, post.image);
        navigate("/profile");
        refClose.current.click();
    };
    const handleClickclose = () => {
        navigate("/profile");
        refClose.current.click();
    };

    const onChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    return (
        <>
            {/* <button ref={ref} type="button" className={`${styles.btnPrimary} d-none`} data-bs-toggle="modal" data-bs-target="#updateModal">
                Launch update modal
            </button> */}
          <div className={`modal fade ${styles.modalBackdrop}`} id="updateModal" tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
    <div className={`${styles.modalDialog} modal-dialog`}>
        <div className={`${styles.modalContent} modal-content`}>
            <div className={`${styles.modalHeader} modal-header`}>
                <h5 className={`${styles.modalTitle} modal-title`} id="updateModalLabel">Edit Post</h5>
                <button type="button" className={`${styles.btnClose} btn-close`} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className={`${styles.modalBody} modal-body`}>
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className={styles.formLabel}>Title</label>
                        <input type="text" className={styles.formControl} id="title" name="title" value={post.title} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className={styles.formLabel}>Content</label>
                        <input type="text" className={styles.formControl} id="content" name="content" value={post.content} onChange={onChange} minLength={5} required />
                    </div>
                    {/* <div className="mb-3">
                        <label htmlFor="image" className={styles.formLabel}>Image URL</label>
                        <input type="text" className={styles.formControl} id="image" name="image" value={post.image} onChange={onChange} />
                    </div> */}
                </form>
            </div>
            <div className={`${styles.modalFooter} modal-footer`}>
    <button ref={refClose} type="button" className={`${styles.btnSecondary} btn-secondary`} data-bs-dismiss="modal" onClick={handleClickclose}>Close</button>
    <button disabled={post.title.length < 5 || post.content.length < 5} onClick={handleClick} type="button" className={`${styles.btnPrimary} btn-primary`}>Update Post</button>
</div>
        </div>
    </div>
</div>

        </>
    );
});

export default UpdatePost;
