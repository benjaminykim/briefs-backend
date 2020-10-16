import 'dotenv/config.js';

const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
	process.env.DATABASE,
	process.env.DATABASE_USER,
	process.env.DATABASE_PASSWORD,
	{
		dialect: 'postgres',
		host: 'db',
	},
);

const modelDefiners = [
	require('./stub.model'),
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

async function testDatabaseConnection() {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

testDatabaseConnection();

module.exports = sequelize;
