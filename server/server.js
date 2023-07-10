// Dependences
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Constants
const PORT = process.env.DB_PORT || 5005;

// Server Application
const app = new express();

// App configuration
app.use(cors());
app.use(express.json());

// Running Server
app.listen({ port: PORT }, () => {
  console.log(`Listening on port ${PORT}`);
});
