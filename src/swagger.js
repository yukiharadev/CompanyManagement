const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation for the project',
        },
        servers: [
            {
                url: 'http://localhost:3020/',
            },
        ],
    },
    apis: [
        path.join(__dirname, './router/index.js'),
        path.join(__dirname, './router/**/index.js'),
        path.join(__dirname, './controllers/**/*.js'),
    ],
};

const specs = swaggerJSDoc(options);

module.exports = {
    swaggerUi,
    specs,
};
