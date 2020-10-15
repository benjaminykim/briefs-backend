import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';

// Constants
const HOST = '0.0.0.0';

// App
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(process.env.API_PORT, HOST);
console.log(`Running app on http://${HOST}:${process.env.API_PORT}`);
