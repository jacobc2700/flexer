const mongoose = require('mongoose');

//All posts are associated with a user.
const PostSchema = new mongoose.Schema({
  user: {
    //In the database, it gets saved as "user": "id"
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', //Reference to 'user' model in User.js
  },
  text: {
    type: String,
    required: true,
  },
  //Name of the user.
  name: {
    type: String,
  },
  //Avatar of the user.
  avatar: {
    type: String,
  },
  //Array of user id objects, so we know which likes are from which users.
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  //Date that the post was made.
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Post = mongoose.model('post', PostSchema);
