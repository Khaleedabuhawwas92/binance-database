module.exports = (app) => {
  const question = require('../controllers/question.controller.js');

  var router = require('express').Router();

  // Create a new Tutorial
  router.post('/', question.create);

  router.post('/insertMany', question.insertMany);

  // Retrieve all Tutorials
  router.get('/', question.findAll);
  // Filtering Data
  router.post('/findone', question.findone);
  router.post('/subject', question.findonesubject);
  router.post('/systems', question.findonesystem);

  // Update a Tutorial with id
  router.put('/:id', question.update);

  // Delete a Tutorial with id
  router.delete('/:id', question.delete);

  // Create a new Tutorial
  router.delete('/', question.deleteAll);

  app.use('/api/question', router);
};
