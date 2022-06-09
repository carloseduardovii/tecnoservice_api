//Models
const { Repair } = require('../models/repairsModel');

//utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const pendingRepairExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({ where: { id, status: 'pending' } });

  if (!repair) {
    return next(new AppError('No pending repair found with that id', 404));
  }

  //Add technician data to the req object
  req.repair = repair;
  next();
});

module.exports = { pendingRepairExist };
