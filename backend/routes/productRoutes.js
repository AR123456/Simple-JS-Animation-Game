import express from "express";
const router = express.Router();
// bring in model
import Product from "../models/productModel";

// products route
router.get("/", async (req, res) => {
  //set product to the model and use find method - returns promise so async await (all mongoose methods use a promise) note that instead of async await could use .then syntax
  const products = await Product.find({});
  res.json(products);
});
// get a single product by its ID
router.get("/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

export default router;
