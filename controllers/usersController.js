const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//models
const { User } = require('../models/usersModel');

dotenv.config({ path: './set.env' });

//utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: { status: 'active' },
    attributes: { exclude: ['password'] },
  });

  res.status(200).json({
    users,
  });
});

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role, status } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashPass = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashPass,
    role,
    status,
  });

  newUser.password = undefined;

  res.status(201).json({ newUser });
});

const getUserById = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({
    user,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email, password } = req.body;

  await user.update({ name, email, password });

  res.status(200).json({ status: 'User was updated' });
});

const deactiveUser = catchAsync(async (req, res) => {
  const { user } = req;

  await user.update({ status: 'disable' });

  res.status(200).json({ status: 'user was deactivated' });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email, status: 'active' },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Invalid credentials', 400));
  }

  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  user.password = undefined;

  res.status(200).json({ token, user });
});

const checkToken = catchAsync(async (req, res, next) => {
  res.status(200).json({ user: req.sessionUser });
});

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deactiveUser,
  login,
  checkToken,
};
