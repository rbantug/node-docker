import express from 'express';
import {
  createPost, deletePost, getAllPost, getSinglePost, updatePost,
} from '../controllers/postController';
import { protectedRoute, restrictedTo } from '../controllers/authController';

const postRouter = express.Router();

postRouter
  .route('/')
  .get(protectedRoute, restrictedTo('admin'), getAllPost)
  .post(createPost);

postRouter
  .route('/:id')
  .get(getSinglePost)
  .patch(updatePost)
  .delete(deletePost);

export default postRouter;
