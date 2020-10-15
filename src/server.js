import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const HOST = '0.0.0.0';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/:stubId', (req, res) => {
  // return res.send(stubs[stubId]):
  return res.send('Received a GET HTTP stub method');
});

app.post('/', (req, res) => {
  const id = uuidv4();
  console.log(req.body);
  console.log(req.body.url);
  return res.send(req.body.url);
  return res.send('Received a POST HTTP method' + id);
});

app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});

app.listen(process.env.API_PORT, HOST);
console.log(`Running app on http://${HOST}:${process.env.API_PORT}`);
