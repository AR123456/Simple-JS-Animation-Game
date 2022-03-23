const express = require("express");
//  init express to app
const app = express();
const port = 5000;
// setting up rotes
app.get("/", (req, res) => {
  res.send("API is running.... ");
});
//
app.listen(5000, console.log(`Server is running on http://localhost:${port}`));
