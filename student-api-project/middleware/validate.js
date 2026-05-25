const { body, validationResult } = require('express-validator');

const studentValidationRules = () => {
  return [
    body('firstName').notEmpty(),
    body('lastName').notEmpty(),
    body('email').isEmail(),
    body('age').isNumeric(),
    body('course').notEmpty(),
    body('gpa').isNumeric(),
    body('enrollmentDate').notEmpty()
  ];
};

const courseValidationRules = () => {
  return [
    body('courseName').notEmpty(),
    body('instructor').notEmpty(),
    body('credits').isNumeric(),
    body('department').notEmpty(),
    body('semester').notEmpty()
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({ errors: errors.array() });
};

module.exports = {
  studentValidationRules,
  courseValidationRules,
  validate
};