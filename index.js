const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
require("dotenv/config");
const authJwt = require("./Database/jwt");
const errorHandler = require("./Database/error-handler");
const connectDB = require("./Database/db");
const swaggerSpec = require("./Database/swagger"); 
const swaggerUi = require("swagger-ui-express");
const api = process.env.API_URL;

// Swagger Middleware
app.use(`${api}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// cors
app.use(cors());
app.options("*", cors());

// middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

// routes
const categorriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const orderRoutes = require("./routes/orders");
const searchRoutes = require("./routes/productsRoutes");

app.use(`${api}/categories`, categorriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/search`, searchRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, orderRoutes);

// Connect to the database
connectDB();

// server
app.listen(8000, () => {
  console.log("Server is running http://localhost:8000");
});
