import Router from 'express';
const { models } = require('../models');

const router = Router();

router.get('/', (req, res) => {
  console.log(models.stub.findAll());
  res.send('Hello World');
});

router.get('/:stubId', (req, res) => {
  // return res.send(stubs[stubId]):
  return res.send('Received a GET HTTP stub method');
});

router.post('/', (req, res) => {
  console.log(req.body);
  console.log(req.body.url);
  return res.send(req.body.url);
  return res.send('Received a POST HTTP method' + id);
});

router.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});

router.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});

export default router;
