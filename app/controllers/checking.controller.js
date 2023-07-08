const db = require("../models");
const Check = db.checking;

// Create and Save a new location
exports.create = (req, res) => {
   // Validate request

   // Create a location
   const location = new Check({
      name: req.body.name ? req.body.name : "LINAUSDT",
   });

   // Save locatins in the database
   location
      .save(location)
      .then((data) => {
         res.send(data);
         console.log("Created A new Location");
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the location",
         });
      });
};

// Retrieve all locations from the database.
exports.findAll = (req, res) => {

   Check.find()
      .sort({ spreads: "desc" })
      .then((data) => {
         res.send(data);

      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving locations.......",
         });
      });
};

// Find a single locations with an id
exports.findOne = (req, res) => {
   const id = req.params.id;
   Check.findById(id)
      .then((data) => {
         if (!data)
            res.status(404).send({
               message: "Not found locatin with id " + id,
            });
         else res.send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message: "Error retrieving location with id=" + id,
         });
      });
};

// Update a locations by the id in the request
exports.update = (req, res) => {
   const id = req.params.id;

   Check.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot update location with id=${id}. Maybe location was not found!`,
            });
         } else res.send({ message: "location was updated successfully." });
      })
      .catch((err) => {
         res.status(500).send({
            message: "Error updating location with id=" + id,
         });
      });
};

// Delete a locations with the specified id in the request
exports.delete = (req, res) => {
   const id = req.params.id;
   if (!req.body.company_name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
   }

   Check.findByIdAndRemove(id, { useFindAndModify: false })
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot delete location with id=${id}. Maybe location was not found!`,
            });
         } else {
            res.send({
               message: "location was deleted successfully!",
            });
         }
      })
      .catch((err) => {
         res.status(500).send({
            message: "Could not delete location with id=" + id,
         });
      });
};

// UNDisplay for list without Delete
exports.published = (req, res) => {
   const id = req.params.id;

   Check.findByIdAndUpdate(
      id,
      {
         $set: {
            published: false,
            updatedAt: new Date(),
         },
      },
      { useFindAndModify: false }
   )
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot update location with id=${id}. Maybe location was not found!`,
            });
         } else {
            res.send({ message: "location was updated successfully." });
            console.log(`location was unDisplay successfully. ${id}`);
         }
      })
      .catch((err) => {
         res.status(500).send({
            message: "Error updating location with id=" + id,
         });
      });
};

// Display for list
exports.recovery = (req, res) => {
   const id = req.params.id;

   Check.findByIdAndUpdate(
      id,
      {
         $set: {
            published: true,
         },
      },
      { useFindAndModify: false }
   )
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot update location with id=${id}. Maybe location was not found!`,
            });
         } else {
            res.send({ message: "location was updated successfully." });
            console.log(`location was Recovery successfully. ${id}`);
         }
      })
      .catch((err) => {
         res.status(500).send({
            message: "Error updating location with id=" + id,
         });
      });
};

// Delete all locations from the database.
exports.deleteAll = (req, res) => {
   Check.deleteMany({})
      .then((data) => {
         res.send({
            message: `${data.deletedCount} locations were deleted successfully!`,
         });
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while removing all locations.",
         });
      });
};

// Find all published locations
exports.findAllPublished = (req, res) => {
   var usersProjection = {
      published: false,
      createdAt: false,
      locatin: false,
      updatedAt: false,
      location: false,
   };
   Check.find({ published: true }, usersProjection)
      .then((data) => {
         res.send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving locations.",
         });
      });
};
exports.findAllunPublished = (req, res) => {
   Check.find({ published: false })
      .then((data) => {
         res.send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving locations.",
         });
      });
};
