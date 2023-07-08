module.exports = (app) => {
   const Check = require("../controllers/checking.controller.js");

   var router = require("express").Router();

   // Create a new locations
   router.post("/", Check.create);

   // Retrieve all locations
   router.get("/", Check.findAll);

   // Retrieve all published locations
   router.get("/published", Check.findAllPublished);

   // Retrieve all published locations
   router.get("/unpublished", Check.findAllunPublished);

   // Retrieve a single Tutorial with id
   router.get("/:id", Check.findOne);

   // Update a Tutorial with id
   router.put("/:id", Check.update);

   // update Without Delete
   router.put("/modifiy/:id", Check.published);

   // update Without Delete
   router.put("/recovery/:id", Check.recovery);

   // Delete a Tutorial with id
   router.delete("/:id", Check.delete);

   // Create a new Tutorial
   router.delete("/", Check.deleteAll);

   app.use("/api/checking", router);
};
