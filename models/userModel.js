import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: [true, 'user must have a username'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'user must have a password'],
    unique: true,
    select: false,
  },
  role: {
    type: String,
    default: 'user',
    enum: {
      values: ['user', 'admin'],
      message: 'Please specify a role',
    },
  },
});

// @ts-ignore
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  return next();
});

export async function correctPassword(
  candidatePassword,
  userPassword,
) {
  return bcrypt.compare(candidatePassword, userPassword);
}

const UserModel = mongoose.model('userModel', userSchema);

export default UserModel;
