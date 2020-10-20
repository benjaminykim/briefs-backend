var express = require('express')
var router = express.Router()
const { models } = require('../models');

router.use(function timeLog (req, res, next) {
	var d = new Date();
	console.log();
	console.log('Time: ', d.toGMTString());
	console.log('From: ', req.originalUrl);
	next();
});

router.get('/', async function(req, res) {
	var ret = {};
	ret.total = await models.Stub.count();
	console.log(ret.total);
	ret.best = await models.Stub.max('hit');
	console.log(ret.best);
	ret.best2 = await models.Stub.findAll({
		attributes: [
			'id',
			'url',
			'hit',
		],
		order: [['hit', 'DESC']],
	}
	);
	res.status(200).send(JSON.stringify(ret));
});

module.exports = router;
