require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');

const app = express();

const { SERVER_PORT, DB_DATABASE, DB_HOST } = process.env;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
// app.use(
//   '/api/v1',
//   require('./routes')
// );

// if route not exist
app.all('*', (req, res) => {
  return res.status(404).json(errorResponse(404, 'Page Not Found...'));
});

app.listen(SERVER_PORT || 5000, async () => {
  try {
    console.log(`>>> Listening on port ${SERVER_PORT || 5000}`);

    await sequelize.authenticate();
    console.log(`>>> Connected to "${DB_DATABASE}" on "${DB_HOST}"!`);
    // await sequelize.sync();
    // console.log(`>>> Synced data successful`);

  } catch (err) {
    console.error(err);
  }
});
