const isAuthenticated = require('../middleware/auth');
const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students');

const {
  studentValidationRules,
  validate
} = require('../middleware/validate');

// GET ALL (public)
router.get('/', studentsController.getAll);

// GET SINGLE (public)
router.get('/:id', studentsController.getSingle);

// CREATE (protected)
router.post(
  '/',
  isAuthenticated,
  studentValidationRules(),
  validate,
  studentsController.createStudent
);

// UPDATE (protected)
router.put(
  '/:id',
  isAuthenticated,
  studentValidationRules(),
  validate,
  studentsController.updateStudent
);

// DELETE (protected)
router.delete('/:id', isAuthenticated, studentsController.deleteStudent);

module.exports = router;