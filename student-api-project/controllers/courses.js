const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET ALL
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('courses').find();
    const courses = await result.toArray();

    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
const getSingle = async (req, res) => {
  try {
    const courseId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .collection('courses')
      .findOne({ _id: courseId });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
const createCourse = async (req, res) => {
  try {
    const course = {
      courseName: req.body.courseName,
      instructor: req.body.instructor,
      credits: req.body.credits,
      department: req.body.department,
      semester: req.body.semester
    };

    const response = await mongodb
      .getDb()
      .collection('courses')
      .insertOne(course);

    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateCourse = async (req, res) => {
  try {
    const courseId = new ObjectId(req.params.id);

    const course = {
      courseName: req.body.courseName,
      instructor: req.body.instructor,
      credits: req.body.credits,
      department: req.body.department,
      semester: req.body.semester
    };

    const response = await mongodb
      .getDb()
      .collection('courses')
      .updateOne({ _id: courseId }, { $set: course });

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Error updating course');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteCourse = async (req, res) => {
  try {
    const courseId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .collection('courses')
      .deleteOne({ _id: courseId });

    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Error deleting course');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCourse,
  updateCourse,
  deleteCourse
};