import 'dotenv/config.js';
const express = require('express');
import cors from 'cors';

const HOST = '0.0.0.0';
const routes = {
	'/': require('./routes/home'),
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

function makeHandlerAwareOfAsyncErrors(handler) {
	return async function(req, res, next) {
		try {
			await handler(req, res);
		} catch (error) {
			next(error);
		}
	};
}

function ignoreFavicon(req, res, next) {
	if (req.originalUrl.includes('favicon.ico')) {
		res.status(204).end();
	}
	next();
}

app.use(ignoreFavicon);

for (const [routeName, routeController] of Object.entries(routes)) {
	if (routeController.getAll) {
		app.get(
			`${routeName}`,
			makeHandlerAwareOfAsyncErrors(routeController.getAll)
		);
	}
	if (routeController.getById) {
		app.get(
			`${routeName}:id`,
			makeHandlerAwareOfAsyncErrors(routeController.getById)
		);
	}
	if (routeController.create) {
		app.post(
			`${routeName}`,
			makeHandlerAwareOfAsyncErrors(routeController.create)
		);
	}
	if (routeController.update) {
		app.put(
			`${routeName}:id`,
			makeHandlerAwareOfAsyncErrors(routeController.update)
		);
	}
	if (routeController.remove) {
		app.delete(
			`${routeName}:id`,
			makeHandlerAwareOfAsyncErrors(routeController.remove)
		);
	}
}

app.listen(process.env.API_PORT, HOST);
console.log(`Running app on http://${HOST}:${process.env.API_PORT}`);
