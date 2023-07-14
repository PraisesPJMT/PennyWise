// Dependences
const express = require('express');
const cors = require('cors');

require('dotenv').config();

// App Manager (ORM)
const { sequelize } = require('./models');

// Constants
const PORT = process.env.DB_PORT || 5005; // Localhost Port

// Server Application Instance
const app = new express();

// App configuration
app.use(cors());
app.use(express.json());

// ROUTES //
// Session Routes
app.use('/session', require('./controllers/sessions'));

// User Routes
app.use('/user', require('./controllers/user'));

// Group Routes
app.use('/group', require('./controllers/group'));

// Group Routes
app.use('/group', require('./controllers/expense'));

// Running Server
app.listen({ port: PORT }, async () => {
  // await sequelize.authenticate();
  // await sequelize.sync({ force: true });
  await sequelize.sync();
  console.log(`Listening on port ${PORT}`);
});
