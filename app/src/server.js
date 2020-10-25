import 'dotenv/config.js';
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const HOST = '0.0.0.0';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

var mainRoutes = require('./routes/app');
var consoleRoutes = require('./routes/console');

app.use('/console', consoleRoutes);
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
