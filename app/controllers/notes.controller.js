const db = require('../models');
const Notes = db.notes;

// Create and Save a new daet
exports.create = (req, res) => {
  // Create a data

  const notes = new Notes({
    titleNotes: req.body.titleNotes ? req.body.titleNotes : 'ddd',
    explanationText: req.body.explanationText ? req.body.explanationText : 'hi',
    quizeText: req.body.quizeText ? req.body.quizeText : 'ss',
  });
  // Save locatins in the database
  notes
    .save(notes)
    .then((data) => {
      res.send(data);
      console.log('Created A new Cash');
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Cash',
      });
    });
};

// Retrieve all calenders from the database.
exports.findAll = (req, res) => {
  Notes.find()
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Cashs.......',
      });
    });
};

// Find a single calenders with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Notes.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: 'Not found locatin with id ' + id,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Cash with id=' + id,
      });
    });
};

// Update a calenders by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const id = req.params.id;

  Notes.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Cash with id=${id}. Maybe Cash was not found!`,
        });
      } else res.send({ message: 'Cash was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Cash with id=' + id,
      });
    });
};

// Delete a calenders with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Notes.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Cash with id=${id}. Maybe Cash was not found!`,
        });
      } else {
        res.send({
          message: 'Cash was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Cash with id=' + id,
      });
    });
};
// Delete a calenders with the specified id in the request

