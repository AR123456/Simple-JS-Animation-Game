import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
// routes
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
// bring in error handling middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
// bring in dotenv
dotenv.config();
// connect to the DB
connectDB();
//  init express to app
const app = express();
// allow json data
app.use(express.json());
// home route
app.get("/", (req, res) => {
  res.send("API is running.... ");
});
//mount routers
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

//paypal config route
// when ready to make payment hit this and get the client ik
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// bring in the error handling middleware
app.use(notFound);
app.use(errorHandler);

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
