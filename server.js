const express = require('express');

const tasksRouter = require('./api/tasks-router');

const server = express();

server.use(express.json());
server.use('/api/tasks/', tasksRouter);


server.get('/', (req, res) =>{
    res.send('<h1>The Tasks API</h1>')
})

module.exports = server;