import Router from 'express';
const { models } = require('../models');

/*
const router = Router();

router.get('/', (req, res) => {
  console.log(models.stub.findAll());
  console.log('root /');
  res.send('Hello World');
});

router.get('/:stubId', (req, res) => {
  // return res.send(stubs[stubId]):
  return res.send('Received a GET HTTP stub method');
});

router.post('/', (req, res) => {
  console.log(req.body);
  console.log(req.body.url);
  return res.send(req.body.url);
  return res.send('Received a POST HTTP method' + id);
});

router.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});

router.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});

export default router;
*/

async function getAll(req, res) {
	const stubs = await models.stub.findAll();
	console.log(stubs);
	if (stubs) {
		res.status(200).json(stubs);
	} else {
		res.status(404).send('404 not found');
	}
};

async function getById(req, res) {
	const id = getIdParam(req);
	const stub = await models.stub.findByPk(id);
	if (stub) {
		res.status(200).json(stub);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	if (req.body.id) {
		res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
	} else {
		await models.stub.create(req.body);
		res.status(201).end();
	}
};

async function update(req, res) {
	const id = getIdParam(req);

	// We only accept an UPDATE request if the `:id` param matches the body `id`
	if (req.body.id === id) {
		await models.stub.update(req.body, {
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
	await models.stub.destroy({
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
