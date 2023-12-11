import express from 'express';
import { login, signup } from '../controllers/authController';

const authRouter = express.Router();

authRouter
  .route('/signup')
  .post(signup);

authRouter
  .route('/login')
  .post(login);

export default authRouter;
