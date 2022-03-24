const express = require("express");
// get dummy products from the package JSON file
const products = require("./data/products");
//  init express to app
const app = express();
const port = 5000;
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

// kick off server
app.listen(5000, console.log(`Server is running on http://localhost:${port}`));
