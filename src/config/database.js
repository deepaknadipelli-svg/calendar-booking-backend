const { Sequelize } = require('sequelize');

const isProd = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: isProd ? '/tmp/database.sqlite' : 'database.sqlite',
  logging: false
});

module.exports = sequelize;