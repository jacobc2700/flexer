const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');

const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

//below: document the route => private routes need tokens

//@route    POST api/posts
//@desc     Create a new post
//@access   Private
router.post(
  '/',
  [auth, [body('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    //If there are errors...
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //Gets the user object without the password.
      const user = await User.findById(req.user.id).select('-password');

      //Create new post object.
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      //Save new post to database.
      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error creating new post.');
    }
  }
);

//@route    GET api/posts
//@desc     Get all the posts
//@access   Private: you have to log in to see the posts
// could make a note on the front-end about logging in to see the posts
router.get('/', auth, async (req, res) => {
  try {
    //Get all the posts, sort by most recent first
    const posts = await Post.find({}).sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error getting all posts.');
  }
});

//@route    GET api/posts/:post_id
//@desc     Get post by id
//@access   Private
router.get('/:post_id', auth, async (req, res) => {
  try {
    //Get post by id
    const post = await Post.findById(req.params.post_id);

    //If there is no post with that id:
    if (!post) {
      //404 - not found
      return res.status(404).json({ msg: 'Post not found.' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    //Non-formatted correctly id
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found.' });
    }

    res.status(500).send('Server error getting post by id.');
  }
});

//@route    PATCH api/posts/:post_id
//@desc     Update a post by id
//@access   Private
router.patch(
  '/:post_id',
  [auth, [body('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    //If there are errors...
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await Post.findById(req.params.post_id);

      if (!post) {
        return res.status(404).json({ msg: 'Post not found.' });
      }

      //We need to make sure that only the owner of this post can update the post.

      //If the creator of the post is not the same as the logged in user...
      if (post.user.toString() !== req.user.id) {
        //401 - not authorized
        return res.status(401).json({ msg: 'User not authorized.' });
      }

      //Update post text.
      post.text = req.body.text;

      //Remove post from database.
      await post.save();

      res.json({ msg: 'Post updated.' });
    } catch (err) {
      console.error(err.message);

      //True if post_id is invalid format
      if (err.kind === 'ObjectId') {
        return res.status(401).json({ msg: 'Post not found.' });
      }

      res.status(500).send('Server error updating post by id.');
    }
  }
);

//@route    DELETE api/posts/:post_id
//@desc     Delete post by id
//@access   Private
router.delete('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found.' });
    }

    //We need to make sure that only the owner of this post can delete the post.

    //If the creator of the post is not the same as the logged in user...
    if (post.user.toString() !== req.user.id) {
      //401 - not authorized
      return res.status(401).json({ msg: 'User not authorized.' });
    }

    //Remove post from database.
    await post.remove();

    res.json({ msg: 'Post removed.' });
  } catch (err) {
    console.error(err.message);

    //True if post_id is invalid format
    if (err.kind === 'ObjectId') {
      return res.status(401).json({ msg: 'Post not found.' });
    }

    res.status(500).send('Server error deleting post by id.');
  }
});

//@route    PUT api/posts/like/:post_id
//@desc     Like a post by id
//@access   Private
router.put('/like/:post_id', auth, async (req, res) => {
  try {
    //Find the post you want to like
    const post = await Post.findById(req.params.post_id);

    //Check if user already liked this post.
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked by user.' });
    }

    post.likes.unshift({ user: req.user.id });

    //Save post to database.
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error liking post by id.');
  }
});

module.exports = router;
