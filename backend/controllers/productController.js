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
// @desc Delete product
// @route DELETE/api/products/:id
// @access Public/Admin
//TODO this should actually be setting a flag isDeleted rather than deleting from the DB
// deleting from DB messes up orders and any order history for user and likely seller tooooo
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  //TODO check to see if user is admin before allowing them to del products
  //TODO checking protected and admin in the routes js file is that enough?
  //Note any admin can edit or del a product  if you wanted to liming the admins
  //to the admin who created the product being the only one who could delete it.
  //would need to add check for req.user._id === rec.product.user._id
  if (product) {
    //
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found ");
  }
});
// when admin clicks create new product,create a sample with dummy data
// then take admin to screen to edit that data
// @desc Create product
// @route POST/api/products
// @access Public/Admin
const createProduct = asyncHandler(async (req, res) => {
  // instantiate a new product
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  //var to hold new product , send to db
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});
// @desc Update product
// @route PUT/api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  // from body get
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  // Product model,id in URL
  const product = await Product.findById(req.params.id);
  // check for product
  if (product) {
    // set feilds
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Create new product review
// @route POST/api/products/:id/review  -post bacuse we are adding a resource
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
  // for the particular review get
  const { rating, comment } = req.body;
  // get the product out of the url
  const product = await Product.findById(req.params.id);

  if (product) {
    // has this user already submitted a review? this const will
    // be true if it has
    const alreadyReviewed = products.reviews.find(
      (r) => r.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("You already reviewed this product");
    }
    // user has not reviewed product so create a review object
    const review = {
      // logged in user name
      name: req.user.name,
      // from the body of the req
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    // push the new review onto the array
    products.reviews.push(review);
    // get number of reviews from array
    product.numReviews = product.reviews.length;
    //calculate overall rating
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      products.reviews.length;
    // save the review to the db
    await product.save();
    // 201 new resource created- send message to front end
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
