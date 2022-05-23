//Models
const { Repair } = require('../models/repairsModel');
const { catchAsync } = require('../utils/catchAsync');

const repairExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({ where: { id, status: 'pending' } });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'Record not found',
    });
  }

  //Add technician data to the req object
  req.repair = repair;
  next();
});

module.exports = { repairExist };
