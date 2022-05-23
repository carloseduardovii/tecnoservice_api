const express = require('express');
const { body } = require('express-validator');

//middlewares
const {
  protectToken,
  protectAdmin,
  userExist,
  protectAccountOwner,
} = require('../middlewares/usersMiddleware');

const {
  createUserValidation,
  createCommentValidation,
  checkValidation,
} = require('../middlewares/validationsMiddleware');

//Controller
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deactiveUser,
  login,
  checkToken,
} = require('../controllers/usersController');

const router = express.Router();

router.route('/login').post(login);

router.route('/').post(createUserValidation, checkValidation, createUser);

router.use(protectToken);

router.route('/').get(protectAdmin, getAllUsers);

router
  .route('/:id')
  .get(protectAdmin, userExist, getUserById)
  .patch(userExist, protectAccountOwner, updateUser)
  .delete(userExist, protectAccountOwner, deactiveUser);

module.exports = { usersRouter: router };
