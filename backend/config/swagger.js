const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const setupSwagger = (app) => {
  const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'EchoApp API',
        version: '1.0.0',
        description: 'API Documentation for EchoApp',
      },
      servers: [
        {
          url: 'http://localhost:5001/api',
        },
      ],
    },
    apis: ['./routes/contact.js'],
  };

  const specs = swaggerJsDoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = setupSwagger;