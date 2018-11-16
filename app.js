const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API"
  });
});

// Route we would like to protect

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post created...",
        authData
      });
    }
  });
  res.json({
    message: "Post created..."
  });
});

app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    name: "john doe",
    email: "john@gmail.com"
  };

  // SYNTAX of JWT includes payload, secretkey and callback
  jwt.sign(
    {
      user
    },
    "secretkey",
    { expiresIn: "30s" },
    (err, token) => {
      res.json({
        token
      });
    }
  );
});

//FORMAT OF TOKEN
// AUTHORIZATION: Bearer <access_token>

// Middleware - Verify Token
function verifyToken(req, res, next) {
  // Get the auth header value
  const bearerHeader = req.headers["authorization"];

  // check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // split at the space
    const bearer = bearerHeader.split(" ");
    // get token from array
    const bearerToken = bearer[1];
    // set the token
    req.token = bearerToken;
    //Next middleware
    next();
  } else {
    // FORBIDDEN
    res.sendStatus(403);
  }
}

app.listen(5000, () => console.log("Serving app on port 5000"));
