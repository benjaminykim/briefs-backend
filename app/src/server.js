import 'dotenv/config.js';
//import express from 'express';
const express = require('express');
import cors from 'cors';
import routes from './routes/index.js';

const HOST = '0.0.0.0';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', routes.home);

app.listen(process.env.API_PORT, HOST);
console.log(`Running app on http://${HOST}:${process.env.API_PORT}`);
