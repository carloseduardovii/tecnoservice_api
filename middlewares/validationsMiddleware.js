const { body, validationResult } = require('express-validator');

//utils
const { AppError } = require('../utils/appError');

const createUserValidation = [
  body('name').notEmpty().withMessage('Name is necessary'),
  body('email')
    .notEmpty()
    .withMessage('Email is necessary')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is necessary')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
];

const createRepairValidations = [
  body('date').notEmpty().withMessage('Enter a valid date'),
  body('computerNumber')
    .notEmpty()
    .withMessage('Enter a valid computer number'),
  body('comments').notEmpty().withMessage('Provide valid comments'),
];

const createCommentValidation = [
  body('text').notEmpty().withMessage('Comment cannot be empty'),
];

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);

    // [msg, msg, msg] -> 'msg. msg. msg'
    const errorMsg = messages.join('. ');

    return next(new AppError(errorMsg, 400));
  }

  next();
};

module.exports = {
  createUserValidation,
  createRepairValidations,
  createCommentValidation,
  checkValidation,
};
