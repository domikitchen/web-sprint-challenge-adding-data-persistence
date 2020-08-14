const express = require("express");
const helmet = require("helmet");

const ProjectRouter = require('./projects/projects_router.js');
const db = require("./data/db-config.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send(`<h2>Please navagate to /api/projects<h2>`)
});

server.use('/api/projects', ProjectRouter);

module.exports = server;
