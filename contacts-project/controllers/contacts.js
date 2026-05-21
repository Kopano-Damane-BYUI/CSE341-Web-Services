const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET ALL
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('contacts').find();
    const contacts = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
const getSingle = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .collection('contacts')
      .findOne({ _id: contactId });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE CONTACT
const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb
      .getDb()
      .collection('contacts')
      .insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json({
        message: 'Contact created successfully',
        id: response.insertedId
      });
    } else {
      res.status(500).json(response.error || 'Error creating contact');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE CONTACT
const updateContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb
      .getDb()
      .collection('contacts')
      .updateOne(
        { _id: contactId },
        { $set: contact }
      );

    if (response.matchedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({
        message: 'Contact not found'
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE CONTACT
const deleteContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .collection('contacts')
      .deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Error deleting contact');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};