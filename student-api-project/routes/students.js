const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students');

const {
  studentValidationRules,
  validate
} = require('../middleware/validate');

router.get('/', studentsController.getAll);

router.get('/:id', studentsController.getSingle);

router.post(
  '/',
  studentValidationRules(),
  validate,
  studentsController.createStudent
);

router.put(
  '/:id',
  studentValidationRules(),
  validate,
  studentsController.updateStudent
);

router.delete('/:id', studentsController.deleteStudent);

module.exports = router;