const fs = require('fs')

module.exports = ({ env }) => ({
  connection: {
    client: process.env.DATABASE_CLIENT,
    connection: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      ssl: {
        rejectUnauthorized: true,
        ca: process.env.CA_CERT
      },
      // ssl: false
    },
  },
});

