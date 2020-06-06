// implement your API here
const express = require("express");
const db = require("./data/db");
const server = express();
server.use(express.json());

server.post("/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
  const user = req.body;
  db.insert(user)
    .then((users) => res.status(201).json(users))
    .catch((err) => res.status(500).json({ errorMessage: err }));
});

server.get("/users", (req, res) => {
  db.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: err });
    });
});

server.put("/users/:id", (req, res) => {
  const user = db.findById(req.param.id);
  if (!user) {
    res.status(500).json({ errorMessage: "Must be a user" });
  } else {
    if (req.params.id < 1 || req.params.id > db.find().length) {
      res.status(404).json({ errorMessage: "User not Found!" });
    } else {
      if (!req.body.name || !req.body.bio) {
        res
          .status(500)
          .json({ errorMessage: "User must contain name and bio!" });
      } else {
        db.update(req.param.id, req.body)
        .then(users =>{res.status(200).json({users})})
        .catch(err =>{res.status(500).json({errorMessage: err})})
      }
    }
  }
});

server.delete("/users/:id", (req, res) => {
  const user = db.findById(req.param.id);
  db.remove(user)
    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(500).json({ errorMessage: err }));
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
