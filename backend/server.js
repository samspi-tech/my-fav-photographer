require('dotenv').config();
const cors = require('cors');
const express = require('express');
const startServer = require('./config/db');
// const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errorHandler');
// const verifiedToken = require('./middlewares/auth/verifiedToken');

const PORT = process.env.PORT || 9099;

const userRoute = require('./routes/user.route');

const server = express();

server.use(
    cors({
        origin: `${process.env.CLIENT_BASE_URL}`,
        // credentials: true,
    }),
);

server.use(express.json());
// server.use(cookieParser());
// server.use(verifiedToken);

server.use('/user', userRoute);

server.use(errorHandler);

startServer(PORT, server);
