module.exports = (app) => {
   const symbols = require("../controllers/symbols.controller.js");
   var router = require("express").Router();

   // Create a new Tutorial
   router.post("/", symbols.create);

   // Retrieve all symbols
   router.get("/", symbols.findAll);

   // Retrieve all published symbols
   router.get("/symbol", symbols.findAllPublished);

   // Retrieve a single Tutorial with id
   router.get("/:id", symbols.findOne);

   // Update a Tutorial with id
   router.put("/:id", symbols.update);

   // ub
   router.put("/modifiy/:id", symbols.published);

   // Delete a Tutorial with id
   router.delete("/:id", symbols.delete);

   // Create a new Tutorial
   router.delete("/", symbols.deleteAll);

   app.use("/api/symbol", router);
};
