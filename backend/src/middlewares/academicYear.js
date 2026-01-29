const InstituteSettings = require("../models/InstituteSettings");

const attachAcademicYear = async (req, res, next) => {
  if (!req.user?.instituteId) return next();

  const settings = await InstituteSettings.findOne({
    instituteId: req.user.instituteId,
  });

  if (settings) {
    req.academicYear = settings.academicYear;
  }

  next();
};

module.exports = { attachAcademicYear };
