import 'dotenv/config.js';
const express = require('express');
import cors from 'cors';

const HOST = '0.0.0.0';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

var mainRoutes = require('./routes/app');
var metaRoutes = require('./routes/meta');

app.use('/meta', metaRoutes);
app.use('/', mainRoutes);

function ignoreFavicon(req, res, next) {
	if (req.originalUrl.includes('favicon.ico')) {
		res.status(204).end();
	}
	next();
}

app.use(ignoreFavicon);

app.listen(process.env.API_PORT, HOST);
console.log(`Running app on http://${HOST}:${process.env.API_PORT}`);
