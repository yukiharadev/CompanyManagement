'use strict';

const mongoose = require('mongoose');

const {db: {host, port, name}} = require('../configs/config.mongodb');
const {countConnection, checkOverload} = require("../helpers/check.connect");

const connectionString = `mongodb://${host}:${port}/${name}`;


class Database{
    constructor() {
        this._connect();
    }

    _connect( type = 'mongodb'){
        mongoose.connect(connectionString)
            .then(() => {
                console.log('MongoDb database connection successful', countConnection());
                checkOverload();
            })
            .catch(err => {
                console.error('MongoDb connection error', err);
            });
    }

    static getInstance(){
        if(!this.database){
            this.database = new Database();
        }
        return this.database;
    }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;