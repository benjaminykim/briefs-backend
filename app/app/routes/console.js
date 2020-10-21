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
	ret.top = await models.Stub.findAll({
		attributes: [
			'id',
			'url',
			'hit',
		],
		order: [['hit', 'DESC']],
	}
	);
	ret.server = {
		week_write: {22, 49, 20, 12, 5, 0, 2},
		week_read: {1204, 2224, 958, 92, 56, 2, 491},
		week_write_total: 104,
		week_read_total: 6324,
		sec_read: 4.2,
		sec_write: 0.23,
		total_write: 4920,
		total_read: 131939,
		total_storage: 100245,
	}
	res.status(200).send(JSON.stringify(ret));
});

module.exports = router;
