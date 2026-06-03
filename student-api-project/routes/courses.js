const isAuthenticated = require('../middleware/auth');
const express = require('express');
const router = express.Router();

const coursesController = require('../controllers/courses');

const {
  courseValidationRules,
  validate
} = require('../middleware/validate');

// GET ALL (public)
router.get('/', coursesController.getAll);

// GET SINGLE (public)
router.get('/:id', coursesController.getSingle);

// CREATE (protected)
router.post(
  '/',
  isAuthenticated,
  courseValidationRules(),
  validate,
  coursesController.createCourse
);

// UPDATE (protected)
router.put(
  '/:id',
  isAuthenticated,
  courseValidationRules(),
  validate,
  coursesController.updateCourse
);

// DELETE (protected)
router.delete('/:id', isAuthenticated, coursesController.deleteCourse);

module.exports = router;