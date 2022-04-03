import express from "express";
const router = express.Router();

// products route - add this to the url and will see the products in JSON file
// when this was in server.js was app.get, now needs to be router.get
// also no longer need to point to the file since will be a route to the DB
// https://stackoverflow.com/questions/41836310/difference-between-app-get-or-router-get-expressjs
router.get("/", (req, res) => {
  res.json(products);
});
// get a single product by its ID -- add this to the url with a product id and will get that
router.get("/:id", (req, res) => {
  // using the same find method used on front end
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

export default router;
