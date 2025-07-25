require('dotenv').config();
const cors = require('cors');
const express = require('express');
const startServer = require('./config/db');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errorHandler');
const verifiedToken = require('./middlewares/auth/verifiedToken');

const PORT = process.env.PORT || 9099;

const userRoute = require('./routes/user.route');
const voteRoute = require('./routes/vote.route');
const postRoute = require('./routes/post.route');
const authRoute = require('./routes/auth.route');
const photoRouter = require('./routes/photo.route');
const commentRoute = require('./routes/comment.route');
const addressRoute = require('./routes/address.route');
const followerRoute = require('./routes/follower.route');
const workshopRoute = require('./routes/workshop.route');
const equipmentRoute = require('./routes/equipment.route');
const participantRoute = require('./routes/participant.route');

const server = express();

server.use(
    cors({
        origin: `${process.env.CLIENT_BASE_URL}`,
        credentials: true,
    }),
);

server.use(express.json());
server.use(cookieParser());
server.use(verifiedToken);

server.use('/user', userRoute);
server.use('/vote', voteRoute);
server.use('/post', postRoute);
server.use('/auth', authRoute);
server.use('/photo', photoRouter);
server.use('/comment', commentRoute);
server.use('/address', addressRoute);
server.use('/follower', followerRoute);
server.use('/workshop', workshopRoute);
server.use('/equipment', equipmentRoute);
server.use('/participant', participantRoute);

server.use(errorHandler);

startServer(PORT, server);
