module.exports = {
    development: {
      dialect: 'sqlite',
      storage: './database.sqlite'
    },
    production: {
      dialect: 'sqlite',
      storage: '/tmp/database.sqlite'
    }
  };