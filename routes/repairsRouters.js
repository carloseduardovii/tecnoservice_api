const express = require('express');

//middlewares
const { pendingRepairExist } = require('../middlewares/repairsMiddleware');
const {
  protectToken,
  protectAdmin,
  protectCustomer,
  protectAccountOwner,
} = require('../middlewares/usersMiddleware');

//controllers
const {
  getAllRepairs,
  createRepair,
  getRepairById,
  repairUpdate,
  repairCancelled,
} = require('../controllers/repairsController');

const router = express.Router();

router.use(protectToken);

router.route('/').post(createRepair);

router.route('/pending').get(protectAdmin, getAllRepairs);

router
  .use('/:id', pendingRepairExist)
  .route('/:id')
  .get(protectAdmin, getRepairById)
  .patch(protectAdmin, protectAccountOwner, repairUpdate)
  .delete(protectAccountOwner, repairCancelled);

module.exports = { repairsRouter: router };
