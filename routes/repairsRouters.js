const express = require('express');

//middlewares
const { repairExist } = require('../middlewares/repairsMiddleware');
const {
  protectToken,
  protectAdmin,
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
const { route } = require('express/lib/router');

const router = express.Router();

router.use(protectToken);

router.route('/pending').get(protectAdmin, getAllRepairs).post(createRepair);

router
  .use('/:id', repairExist)
  .route('/:id')
  .get(getRepairById)
  .patch(protectAccountOwner, repairUpdate)
  .delete(protectAccountOwner, repairCancelled);

module.exports = { repairsRouter: router };
