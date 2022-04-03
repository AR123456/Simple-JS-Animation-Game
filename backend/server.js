import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import productsRoutes from "./routes/productRoutes.js";

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
