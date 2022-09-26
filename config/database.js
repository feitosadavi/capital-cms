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
        ca:
          process.env.NODE_ENV === PRODUCTION
            ? process.env.CA_CERT
            : fs.readFileSync("ca_cert.crt").toString(),
      },
      // ssl: false
    },
  },
});

