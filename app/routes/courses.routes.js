module.exports = (app) => {
  const cash = require('../controllers/courses.controller.js');

  var router = require('express').Router();
  // Create a new Tutorial
  router.post('/', cash.create);
  // Retrieve all Cash
  router.get('/', cash.findAll);

  // Retrieve all published Cash
  router.get('/published', cash.findAllPublished);

  // Retrieve all published Cash
  router.get('/unpublished', cash.findAllunPublished);

  // Retrieve a single Tutorial with id
  router.get('/:id', cash.findOne);

  // Update a Tutorial with id
  router.put('/:id', cash.update);

  // update Without Delete
  router.put('/modifiy/:id', cash.published);

  // update Without Delete
  router.put('/recovery/:id', cash.recovery);

  // Delete a Tutorial with id
  router.delete('/:id', cash.delete);

  // Create a new Tutorial
  router.delete('/', cash.deleteAll);

  app.use('/api/courses', router);
};
