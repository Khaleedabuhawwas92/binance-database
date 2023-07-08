module.exports = (app) => {
   const discraption = require("../controllers/discraption.controller.js");

   var router = require("express").Router();

   // Create a new Tutorial
   router.post("/", discraption.create);

   // Retrieve all Tutorials
   router.get("/", discraption.findAll);

   // Retrieve all published Tutorials
   router.get("/published", discraption.findAllPublished);

   // Retrieve all published Tutorials
   router.get("/unpublished", discraption.findAllunPublished);

   // Update a Tutorial with id
   router.put("/:id", discraption.update);

   // Delete a Tutorial with id
   router.delete("/:id", discraption.delete);

   // Create a new Tutorial
   router.delete("/", discraption.deleteAll);

   app.use("/api/discraption", router);
};
