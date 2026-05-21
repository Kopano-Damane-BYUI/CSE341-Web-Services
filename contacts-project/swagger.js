const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'Contacts API Documentation'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger-output.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);