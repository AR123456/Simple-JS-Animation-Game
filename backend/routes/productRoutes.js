import express from "express";
// package to handle multiple try catch
import asyncHandler from "express-async-handler";
const router = express.Router();
// bring in model
import Product from "../models/productModel.js";
// products route
// router.get("/", async (req, res) => {
// now using the async handler package - wrap the async in asyncHandler
// @desc Fetch all products
// @route GET/api/products
// @access Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    //set product to the model and use find method - returns promise so async await
    //(all mongoose methods use a promise) note that instead of async await could use .then syntax
    const products = await Product.find({});

    res.json(products);
  })
);
// get a single product by its ID
// router.get("/:id", (req, res) => {
// now using express-async-handler
// @desc Fetch single product
// @route GET/api/products/:id
// @access Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
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
  })
);
export default router;
