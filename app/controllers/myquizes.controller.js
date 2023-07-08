const db = require("../models");
const Myquizes = db.myquizes;

// Create and Save a new daet
exports.create = (req, res) => {
   // Validate request

   // Create a daet
   const myquizes = new Myquizes({
      title: req.body.title,
      start: req.body.start ? req.body.end : new Date(),
      end: req.body.end ? req.body.end : new Date(),
      className: req.body.className ? req.body.className : "info",
      url: req.body.url ? req.body.url : "null",
      allDay: req.body.allDay ? req.body.allDay : false,
      published: req.body.published ? req.body.published : true,
   });

   // Save locatins in the database
   myquizes
      .save(myquizes)
      .then((data) => {
         res.send(data);
         console.log("Created A new calender");
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the calender",
         });
      });
};

// Retrieve all calenders from the database.
exports.findAll = (req, res) => {
   const title = req.query.title;
   var condition = title
      ? { company_name: { $regex: new RegExp(company_name), $options: "i" } }
      : {};

      Myquizes.find(condition)
      .then((data) => {
         res.send(data);
         console.log(data);
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving calenders.......",
         });
      });
};

// Find a single calenders with an id
exports.findOne = (req, res) => {
   const id = req.params.id;

   Myquizes.findById(id)
      .then((data) => {
         if (!data)
            res.status(404).send({
               message: "Not found locatin with id " + id,
            });
         else res.send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message: "Error retrieving calender with id=" + id,
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

   Myquizes.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot update calender with id=${id}. Maybe calender was not found!`,
            });
         } else res.send({ message: "calender was updated successfully." });
      })
      .catch((err) => {
         res.status(500).send({
            message: "Error updating calender with id=" + id,
         });
      });
};

// Delete a calenders with the specified id in the request
exports.delete = (req, res) => {
   const id = req.params.id;
   if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
   }

   Myquizes.findByIdAndRemove(id, { useFindAndModify: false })
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot delete calender with id=${id}. Maybe calender was not found!`,
            });
         } else {
            res.send({
               message: "calender was deleted successfully!",
            });
         }
      })
      .catch((err) => {
         res.status(500).send({
            message: "Could not delete calender with id=" + id,
         });
      });
};

// UNDisplay for list without Delete
exports.published = (req, res) => {
   const id = req.params.id;

   Myquizes.findByIdAndUpdate(
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
               message: `Cannot update calender with id=${id}. Maybe calender was not found!`,
            });
         } else {
            res.send({ message: "calender was updated successfully." });
            console.log(`calender was unDisplay successfully. ${id}`);
         }
      })
      .catch((err) => {
         res.status(500).send({
            message: "Error updating calender with id=" + id,
         });
      });
};

// Display for list
exports.recovery = (req, res) => {
   const id = req.params.id;

   Myquizes.findByIdAndUpdate(
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
               message: `Cannot update calender with id=${id}. Maybe calender was not found!`,
            });
         } else {
            res.send({ message: "calender was updated successfully." });
            console.log(`calender was Recovery successfully. ${id}`);
         }
      })
      .catch((err) => {
         res.status(500).send({
            message: "Error updating calender with id=" + id,
         });
      });
};

// Delete all calenders from the database.
exports.deleteAll = (req, res) => {
   Myquizes.deleteMany({})
      .then((data) => {
         res.send({
            message: `${data.deletedCount} calenders were deleted successfully!`,
         });
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while removing all calenders.",
         });
      });
};

// Find all published calenders
exports.findAllPublished = (req, res) => {
   var selectedData = {
      __v: false,
      _id: false,
      allDay: false,
      className: false,
      published: false,
   };
   Myquizes.find({ published: true }, selectedData)
      .then((data) => {
         res.send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving calenders.",
         });
      });
};
exports.findAllunPublished = (req, res) => {
   Myquizes.find({ published: false })
      .then((data) => {
         res.send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving calenders.",
         });
      });
};
