// package to handle multiple try catch
import asyncHandler from "express-async-handler";
// bring in model
import Product from "../models/productModel.js";

// @desc Fetch all products
// @route GET/api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  //(all mongoose methods use a promise) note that instead of async await could use .then syntax
  const products = await Product.find({});

  res.json(products);
});
// @desc Fetch single product
// @route GET/api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  // const product = products.find((p) => p._id === req.params.id);
  // get the id that is in the URL
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    // res.status(404).json({ message: "Product not found" });
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProductById };