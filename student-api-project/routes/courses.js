const express = require('express');
const router = express.Router();

const coursesController = require('../controllers/courses');

const {
  courseValidationRules,
  validate
} = require('../middleware/validate');

router.get('/', coursesController.getAll);

router.get('/:id', coursesController.getSingle);

router.post(
  '/',
  courseValidationRules(),
  validate,
  coursesController.createCourse
);

router.put(
  '/:id',
  courseValidationRules(),
  validate,
  coursesController.updateCourse
);

router.delete('/:id', coursesController.deleteCourse);

module.exports = router;