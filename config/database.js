// For use by sequelize-cli
module.exports = {
  "development" : {
    "database" : process.env.POSTGRES_DATABASE,
    "username" : process.env.POSTGRES_USERNAME,
    "password" : process.env.POSTGRES_PASSWORD,
    "host" : process.env.POSTGRES_HOST,
    "dialect" : "postgres"
  },

  "test"   : {
    "database" : process.env.POSTGRES_DATABASE,
    "username" : process.env.POSTGRES_USERNAME,
    "password" : process.env.POSTGRES_PASSWORD,
    "host" : process.env.POSTGRES_HOST,
    "dialect" : "postgres"
  },

  "production" : {
    "database" : process.env.POSTGRES_DATABASE,
    "username" : process.env.POSTGRES_USERNAME,
    "password" : process.env.POSTGRES_PASSWORD,
    "host" : process.env.POSTGRES_HOST,
    "dialect" : "postgres"
  }
}
