require('dotenv').config();
const express = require('express');
const startServer = require('./config/db');

const PORT = process.env.PORT || 9099;

const server = express();

server.use(express.json());

startServer(PORT, server);
