const db = require("../models");
const Cash = db.cash;

// Create and Save a new daet
exports.create = (req, res) => {
   // Validate request
   if (!req.body.amount && !req.body.amount === Number) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
   }

   // Create a data

   const cash = new Cash({
      amount: req.body.amount,
      discrption: req.body.discrption,
      published: req.body.published ? req.body.published : true,
   });
   // Save locatins in the database
   cash
      .save(cash)
      .then((data) => {
         res.send(data);
         console.log("Created A new Cash");
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the Cash",
         });
      });
};

// Retrieve all calenders from the database.
exports.findAll = (req, res) => {
   const amount = req.query.amount;
   var condition = amount
      ? {
           discrption: {
              $regex: new RegExp(discrption),
              $options: "i",
           },
        }
      : {};

   Cash.find(condition)
      .then((data) => {
         res.send(data);
         console.log(data);
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving Cashs.......",
         });
      });
};

// Find a single calenders with an id
exports.findOne = (req, res) => {
   const id = req.params.id;
   Cash.findById(id)
      .then((data) => {
         if (!data)
            res.status(404).send({
               message: "Not found locatin with id " + id,
            });
         else res.send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message: "Error retrieving Cash with id=" + id,
         });
      });
};

// Update a calenders by the id in the request
exports.update = (req, res) => {
   if (!req.body) {
      return res.status(400).send({
         message: "Data to update can not be empty!",
      });
   }

   const id = req.params.id;

   Cash.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot update Cash with id=${id}. Maybe Cash was not found!`,
            });
         } else res.send({ message: "Cash was updated successfully." });
      })
      .catch((err) => {
         res.status(500).send({
            message: "Error updating Cash with id=" + id,
         });
      });
};

// Delete a calenders with the specified id in the request
exports.delete = (req, res) => {
   const id = req.params.id;
   if (!req.body.amount) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
   }

   Cash.findByIdAndRemove(id, { useFindAndModify: false })
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot delete Cash with id=${id}. Maybe Cash was not found!`,
            });
         } else {
            res.send({
               message: "Cash was deleted successfully!",
            });
         }
      })
      .catch((err) => {
         res.status(500).send({
            message: "Could not delete Cash with id=" + id,
         });
      });
};

// UNDisplay for list without Delete
exports.published = (req, res) => {
   const id = req.params.id;

   Cash.findByIdAndUpdate(
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
               message: `Cannot update Cash with id=${id}. Maybe Cash was not found!`,
            });
         } else {
            res.send({ message: "Cash was updated successfully." });
            console.log(`Cash was Un Display successfully. ${id}`);
         }
      })
      .catch((err) => {
         res.status(500).send({
            message: "Error updating Cash with id=" + id,
         });
      });
};

// Display for list
exports.recovery = (req, res) => {
   const id = req.params.id;

   Cash.findByIdAndUpdate(
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
               message: `Cannot update Cash with id=${id}. Maybe Cash was not found!`,
            });
         } else {
            res.send({ message: "calender was updated successfully." });
            console.log(`Cash was Recovery successfully. ${id}`);
         }
      })
      .catch((err) => {
         res.status(500).send({
            message: "Error updating Cash with id=" + id,
         });
      });
};

// Delete all cash from the database.
exports.deleteAll = (req, res) => {
   Cash.deleteMany({})
      .then((data) => {
         res.send({
            message: `${data.deletedCount} Cash were deleted successfully!`,
         });
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || "Some error occurred while removing all Cash.",
         });
      });
};

// Find all published cash
exports.findAllPublished = (req, res) => {
   Cash.find({
      published: true,
   })
      .select("amount discrption ")
      .then((data) => {
         res.send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving Cash.",
         });
      });
};
exports.findAllunPublished = (req, res) => {
   Cash.find({ published: false })
      .then((data) => {
         res.send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving Cash.",
         });
      });
};
