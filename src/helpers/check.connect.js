'use strict';

const mongoose = require('mongoose');
const os = require('os');
const process = require('process');

const SECOND = 10000;

//check number connection
const countConnection = () =>{
    return `\n Number of connection: ${mongoose.connections.length}`;
}

//check overload

const checkOverload = () =>{
    setInterval(() => {
        const numConnections = mongoose.connections.length;
        const numCpus = os.cpus().length;
        const numProcesses = process.env.WORKERS || numCpus;

        console.log('Number of connections: ', numConnections);
        console.log("Max processes: ", numCpus);
        console.log(`Memory usage: ${numProcesses / 1024 / 1024} MB`);

        if(numConnections > numProcesses){
            console.log('Overload');
            process.exit(1);
        }
    }, SECOND);
}

module.exports = {countConnection, checkOverload};