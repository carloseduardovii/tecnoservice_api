const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//Models
const { User } = require('../models/usersModel');

//utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

dotenv.config({ path: './set.env' });

const protectToken = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Credentials not valid', 403));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({
    where: { id: decoded.id, status: 'active' },
  });

  if (!user) {
    return next(new AppError('Owner of this token is no loger available', 403));
  }

  req.sessionUser = user;

  next();
});

const protectAdmin = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  if (sessionUser.role !== 'admin') {
    return next(new AppError('Access not granted', 403));
  }

  next();
});

const protectCustomer = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  if (sessionUser.role !== 'customer') {
    return next(new AppError('Access not granted', 403));
  }

  next();
});

const userExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id, status: 'active' },
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'Sorry, user not found',
    });
  }

  req.user = user;
  next();
});

const protectAccountOwner = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { sessionUser } = req;

  if (sessionUser.id !== +id) {
    return next(new AppError('You do not own this account', 403));
  }

  next();
});

module.exports = {
  protectToken,
  protectAdmin,
  protectCustomer,
  userExist,
  protectAccountOwner,
};
