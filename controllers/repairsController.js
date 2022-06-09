const { Repair } = require('../models/repairsModel');
const { User } = require('../models/usersModel');

//utils
const { catchAsync } = require('../utils/catchAsync');

const getAllRepairs = catchAsync(async (req, res, next) => {
  const repairs = await Repair.findAll({
    include: [{ model: User, attributes: ['id', 'name', 'email'] }],
  });
  res.status(200).json({
    repairs,
  });
});

const getRepairById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: { id },
    include: [{ model: User, attributes: ['id', 'name', 'email'] }],
  });

  res.status(200).json({ repair });
});

const createRepair = catchAsync(async (req, res, next) => {
  const { date, computerNumber, comments } = req.body;

  const { sessionUser } = req;

  const newRepair = await Repair.create({
    userId: sessionUser.id,
    date,
    computerNumber,
    comments,
  });

  res
    .status(201)
    .json({ status: 'This service has been created successfully', newRepair });
});

const repairUpdate = catchAsync(async (req, res, next) => {
  const { repair } = req;

  const repairUpdated = await repair.update({ status: 'completed' });

  res.status(200).json({ status: 'Repair was completed', repairUpdated });
});

const repairCancelled = catchAsync(async (req, res, next) => {
  const { repair } = req;

  const repairCancelled = await repair.update({ status: 'cancelled' });

  res.status(200).json({ status: 'Service was cancelled', repairCancelled });
});

const getAllCompleteRepairs = catchAsync(async (req, res, next) => {
  const completes = await Repair.findAll({
    where: { status: 'complete' },
    include: [{ model: User, attributes: ['id', 'name', 'email'] }],
  });

  res.status(200).json({ completes });
});

const getAllPendingRepairs = catchAsync(async (req, res, next) => {
  const pendings = await Repair.findAll({
    where: { status: 'pending' },
    include: [{ model: User, attributes: ['id', 'name', 'email'] }],
  });

  res.status(200).json({ pendings });
});

module.exports = {
  getAllRepairs,
  getRepairById,
  createRepair,
  repairUpdate,
  repairCancelled,
  getAllCompleteRepairs,
  getAllPendingRepairs,
};
