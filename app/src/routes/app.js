var express = require('express')
var md5 = require('md5');
var router = express.Router()
const { models } = require('../models');

router.use(function timeLog (req, res, next) {
	var d = new Date();
	console.log();
	console.log('Time: ',d.toGMTString());
	console.log('From: ', req.originalUrl);
	next();
});

router.get('/', function(req, res) {
	res.redirect("https://make.briefs.link");
});

router.get('/all', async function(req, res) {
	const stubs = await models.Stub.findAll();
	res.status(200).send(stubs);
});

router.get('/:id', async function(req, res) {
	const id = req.params.id;
	const record = await models.Stub.findByPk(id);
	console.log(id);
	if (record) {
		record.hit = record.hit + 1;
		await record.save();
		console.log(record.dataValues);
		res.redirect(record.dataValues.url);
	} else {
		res.status(404).send('404 - Not found');
	}
});

async function getUniqueHash(url) {
	const string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var stringLength = string.length;
	function getRandomChar() {
		return string.charAt(Math.floor(Math.random() * stringLength));
	}

	var isUnique = false;
	var salt = "a";
	while (!isUnique) {
		var stub = md5(url).slice(0, 6);
		var exists = await models.Stub.findByPk(stub);
		isUnique = !exists;
		url = url + getRandomChar();
	}
	return stub;
}

router.post('/', async function(req, res) {
	console.log(req.body);
	if (req.body) {
		var stub = await getUniqueHash(req.body.url);
		const ret = await models.Stub.create({'stub': stub, 'url':req.body.url});
		await ret.save();
		console.log(ret);
		res.status(201).end(JSON.stringify({stub: ret.stub}));
	}
});

router.put('/:id', async function(req, res) {
	const id = req.params.id;
	if (req.body.id === id) {
		await models.Stub.update(req.body, {
			where: {
				stub: stub
			}
		});
	} else {
		res.status(400).send("Bad Request");
	}
});

router.delete('/:id', async function(req, res) {
	const id = req.params.id;
	if (req.body.id === id) {
		await models.Stub.destroy({
			where: {
				stub: stub
			}
		});
	}
	res.status(200).end();
});

module.exports = router;
