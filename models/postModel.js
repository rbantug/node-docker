import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Post must have a title'],
  },
  body: {
    type: String,
    required: [true, 'Post must have a body'],
  },
});

const PostModel = mongoose.model('postModel', schema);

export default PostModel;
