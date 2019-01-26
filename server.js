const express = require('express');
const app = express();

// MIDDLEWARE
app.use(express.static('public'));

// ROUTES
// stay tuned

// SERVER START
app.listen(3000, () => {
  console.log("server listening at localhost:3000 :)");
});