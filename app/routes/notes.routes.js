module.exports = (app) => {
    const notes = require("../controllers/notes.controller.js");

    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", notes.create);

    // Retrieve all Tutorials
    router.get("/", notes.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", notes.findOne);

    // Update a Tutorial with id
    router.put("/:id", notes.update);

    // Delete a Tutorial with id
   router.delete("/:id", notes.delete);
 

    app.use("/api/notes", router);
 };
 