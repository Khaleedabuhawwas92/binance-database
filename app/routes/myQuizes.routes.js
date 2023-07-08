module.exports = (app) => {
    const myquizes = require("../controllers/myquizes.controller.js");
 
    var router = require("express").Router();
 
    // Create a new Tutorial
    router.post("/", myquizes.create);
 
    // Retrieve all Tutorials
    router.get("/", myquizes.findAll);
 
    // Retrieve all published Tutorials
    router.get("/published", myquizes.findAllPublished);
 
    // Retrieve all published Tutorials
    router.get("/unpublished", myquizes.findAllunPublished);
 
    // Retrieve a single Tutorial with id
    router.get("/:id", myquizes.findOne);
 
    // Update a Tutorial with id
    router.put("/:id", myquizes.update);
 
    // update Without Delete
    router.put("/modifiy/:id", myquizes.published);
 
    // update Without Delete
    router.put("/recovery/:id", myquizes.recovery);
 
    // Delete a Tutorial with id
    router.delete("/:id", myquizes.delete);
 
    // Create a new Tutorial
    router.delete("/", myquizes.deleteAll);
 
    app.use("/api/myquizes", router);
 };
 