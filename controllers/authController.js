import { randomUUID } from 'crypto';
import UserModel, { correctPassword } from '../models/userModel';

const sendSession = (statusCode, { id, username, role }, req, res) => {
  req.session.authenticated = true;
  req.session.user = {
    id,
    username,
    role,
  };

  res.status(statusCode).json({
    status: 'success',
    message: 'You are logged in',
  });
};

export const signup = async (req, res, next) => {
  try {
    const newUser = await UserModel.create({
      id: randomUUID(),
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
    });

    sendSession(200, newUser, req, res);
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new Error('Provide an email and password');
    }

    const user = await UserModel.findOne({ username }).select('+password');

    if (!user || !(await correctPassword(password, user.password))) {
      throw new Error('Invalid username or password');
    }

    sendSession(200, user, req, res);
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
};

export const protectedRoute = async (req, res, next) => {
  try {
    if (!req.session.user || !req.session.authenticated) throw new Error('You are not logged in.');

    const { id, username } = req.session.user;
    const user = await UserModel.findOne({ id });

    if (!user || user.username !== username) throw new Error('User does not exist');

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

export const restrictedTo = (...roles) => (req, res, next) => {
  try {
    if (!roles.includes(req.user.role)) throw new Error('You are authorized to access this route');
    next();
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};
