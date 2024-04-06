// swagger.js
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce api",
      verion: "1.0.0",
      contact: {
        name: "mayank Gupta",
        email: "mayankgupta.edu@gmail.com"
      }
    },
    servers: [
      {
        url: "http://localhost:8000/api/v1/"
      }
    ]
  },
  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
