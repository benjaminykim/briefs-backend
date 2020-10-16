import Router from 'express';
const { models } = require('../models');
const axios = require('axios');

async function getAll(req, res) {
	const stubs = await models.Stub.findAll();
	console.log(stubs);
	if (stubs) {
		res.status(200).json(stubs);
	} else {
		res.status(404).send('404 not found');
	}
};

async function getById(req, res) {
	const id = req.params.id;
	const stub = await models.Stub.findByPk(id);
	if (stub) {
		//console.log(stub.dataValues.url);
		//res.status(302).json(stub).url;
		//res.status(200).json(stub);
		const res = await axios.get("https://google.com");
		res.data;
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	console.log(req.body);
	if (req.body.id) {
		res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
	} else {
		await models.Stub.create(req.body);
		res.status(201).end();
	}
};

async function update(req, res) {
	const id = getIdParam(req);

	// We only accept an UPDATE request if the `:id` param matches the body `id`
	if (req.body.id === id) {
		await models.Stub.update(req.body, {
			where: {
				id: id
			}
		});
		res.status(200).end();
	} else {
		res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
	}
};

async function remove(req, res) {
	const id = getIdParam(req);
	await models.Stub.destroy({
		where: {
			id: id
		}
	});
	res.status(200).end();
};

module.exports = {
	getAll,
	getById,
	create,
	update,
	remove,
};
