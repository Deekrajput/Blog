const express = require('express');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Post = require('../models/Postm');
const router = express.Router();

// ROUTE 1: Get All Posts: GET "/api/post/allposts". Login required
router.post('/allposts', fetchuser, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// ROUTE 2: Create a Post: POST "/api/post/createpost". Login required
router.post('/createpost', fetchuser, [
  body('title', 'Title is required').notEmpty(),
  body('content', 'Content is required').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, content, image } = req.body;
    const post = new Post({
      user: req.user.id,
      title,
      content,
      image,
    });

    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// ROUTE 3: Update a Post: PUT "/api/post/updatepost/:id". Login required
router.put('/updatepost/:id', fetchuser, async (req, res) => {
  const { title, content, image } = req.body;

  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    post = await Post.findByIdAndUpdate(req.params.id, { $set: { title, content, image } }, { new: true });
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// ROUTE 4: Delete a Post: DELETE "/api/post/deletepost/:id". Login required
router.delete('/deletepost/:id', fetchuser, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Post removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
