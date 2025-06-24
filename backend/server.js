require('dotenv').config();
const express = require('express');
const startServer = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

const PORT = process.env.PORT || 9099;

const server = express();

server.use(express.json());

server.use(errorHandler);

startServer(PORT, server);
