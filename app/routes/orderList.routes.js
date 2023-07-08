module.exports = (app) => {
  const order = require('../controllers/orderList.controller.js');

  var router = require('express').Router();
  // Create a new Tutorial
  router.post('/', order.create);


  router.put("/add/:id/:order", order.addCoursesToUser);
  
  // Retrieve all Cash
  router.get('/', order.findAll);

  // Retrieve all published Cash
  router.get('/published', order.findAllPublished);

  // Retrieve all published Cash
  router.get('/unpublished', order.findAllunPublished);

  // Retrieve a single Tutorial with id
  router.get('/:id', order.findOne);

  // Update a Tutorial with id
  router.put('/:id', order.update);

  // update Without Delete
  router.put('/modifiy/:id', order.published);

  // update Without Delete
  router.put('/recovery/:id', order.recovery);

  // Delete a Tutorial with id
  router.delete('/:id', order.delete);

  // Create a new Tutorial
  router.delete('/', order.deleteAll);

  app.use('/api/order', router);
};
