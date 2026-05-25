const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET ALL
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('students').find();
    const students = await result.toArray();

    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
const getSingle = async (req, res) => {
  try {
    const studentId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .collection('students')
      .findOne({ _id: studentId });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
const createStudent = async (req, res) => {
  try {
    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age,
      course: req.body.course,
      gpa: req.body.gpa,
      enrollmentDate: req.body.enrollmentDate
    };

    const response = await mongodb
      .getDb()
      .collection('students')
      .insertOne(student);

    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateStudent = async (req, res) => {
  try {
    const studentId = new ObjectId(req.params.id);

    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age,
      course: req.body.course,
      gpa: req.body.gpa,
      enrollmentDate: req.body.enrollmentDate
    };

    const response = await mongodb
      .getDb()
      .collection('students')
      .updateOne({ _id: studentId }, { $set: student });

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Error updating student');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteStudent = async (req, res) => {
  try {
    const studentId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .collection('students')
      .deleteOne({ _id: studentId });

    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Error deleting student');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createStudent,
  updateStudent,
  deleteStudent
};