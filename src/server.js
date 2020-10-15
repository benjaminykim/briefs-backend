import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
const HOST = '0.0.0.0';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/:stubId', (req, res) => {
  // return res.send(stubs[stubId]):
  return res.send('Received a GET HTTP stub method');
});

app.post('/', (req, res) => {
  //return res.send(req.params.url);
  return res.send('Received a POST HTTP method');
});

app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});

app.listen(process.env.API_PORT, HOST);
console.log(`Running app on http://${HOST}:${process.env.API_PORT}`);
