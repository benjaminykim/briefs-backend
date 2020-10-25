'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stub extends Model {
    static associate(models) {
    }
  };
  Stub.init({
    url: DataTypes.STRING,
    hit: DataTypes.INTEGER,
    stub: {type:DataTypes.STRING, primaryKey: true},
  }, {
    sequelize,
    modelName: 'Stub',
    indexes: [
      {
	unique: true,
	fields:['stub']
      }
    ]
  });
  return Stub;
};
