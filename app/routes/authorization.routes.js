module.exports = (app) => {
   const auth = require("../controllers/authorization.controller.js");

   var router = require("express").Router();

   // Create a new Tutorial
   router.post("/", auth.findUser);
   router.get("/user", auth.getUser);
   app.use("/api/authorization", router);
};
