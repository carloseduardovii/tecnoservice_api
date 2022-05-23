const { Repair } = require('../models/repairsModel');

//utils
const { catchAsync } = require('../utils/catchAsync');

const getAllRepairs = catchAsync(async (req, res, next) => {
  const repairs = await Repair.findAll();
  res.status(200).json({
    repairs,
  });
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

  res.status(201).json({ newRepair });
});

const getRepairById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({ where: { id, status: 'pending' } });

  res.status(200).json({ repair });
});

const repairUpdate = catchAsync(async (req, res, next) => {
  const { repair } = req;

  await repair.update({ status: 'completed' });

  res.status(200).json({ status: 'Repair was completed' });
});

const repairCancelled = catchAsync(async (req, res, next) => {
  const { repair } = req;

  await repair.update({ status: 'cancelled' });

  res.status(200).json({ status: 'Service was cancelled' });
});

module.exports = {
  getAllRepairs,
  createRepair,
  getRepairById,
  repairUpdate,
  repairCancelled,
};
