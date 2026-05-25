const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Student API',
    description: 'Student Management API'
  },
  host: 'cse341-web-services-qht2.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger-output.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);