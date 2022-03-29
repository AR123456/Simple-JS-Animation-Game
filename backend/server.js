import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import products from "./data/products.js";

// bring in dotenv
dotenv.config();
//  init express to app

// connect to the DB
connectDB();

const app = express();

// home route
app.get("/", (req, res) => {
  res.send("API is running.... ");
});
// products route - add this to the url and will see the products in JSON file
app.get("/api/products", (req, res) => {
  res.json(products);
});
// get a single product by its ID -- add this to the url with a product id and will get that
app.get("/api/products/:id", (req, res) => {
  // using the same find method used on front end
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});
// get the port out of the .env file or use 5000
const PORT = process.env.PORT || 5000;

// kick off server
app.listen(
  5000,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`
  )
);
