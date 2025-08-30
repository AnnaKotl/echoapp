const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
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
          url: 'http://localhost:5001', // http://localhost:5001/api-docs
        },
      ],
    },
    apis: [__dirname + '/../routes/**/*.js'],
  };  

  const specs = swaggerJsDoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = setupSwagger;