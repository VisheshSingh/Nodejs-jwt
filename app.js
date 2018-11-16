const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API"
  });
});

app.post("/api/posts", (req, res) => {
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
  jwt.sign(
    {
      user
    },
    "secretkey",
    (err, token) => {
      res.json({
        token
      });
    }
  );
});

app.listen(5000, () => console.log("Serving app on port 5000"));
