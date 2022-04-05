import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

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

//mount router
// anything going to /api/products will be linked to productRoutes
app.use("/api/products", productRoutes);

// custom middleware
// this one if for 400 errors
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});
// with err middleware to override do err first then req, res, next
app.use((err, req, res, next) => {
  // may get 200 even if error, if it is a 200 then make it a 500 whichs
  // is a server error, else send the status code
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  // set res.status to the status code
  res.status(statusCode);
  // respond with JSON object
  res.json({
    // get message from error objcect
    message: err.message,
    // stack trace if not in production
    stack: process.env.NODE__ENV === "production" ? null : err.stack,
  });
});

// get the port out of the .env file or use 5000
const PORT = process.env.PORT || 5000;

// kick off server
app.listen(
  5000,
  console.log(
    // adding some color to console .log
    `Server is running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`
      .magenta.bold
  )
);
