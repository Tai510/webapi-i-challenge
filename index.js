// implement your API here


const express = require('express');

const db = require('./data/db.js');

const server = express();

server.post("/api/users" , (req, res) => {
    const param = req.body;
    console.log(param)
    db.insert(param).then((result) => {
       res.json({ result });
    })
})

server.get("/api/users" , (req, res) => {
    db.find().then((data) => {
        res.json({ data });
    }).catch(() => {
        res.statusCode(500).send({ error: "The users information could not be retrieved." })
    })
})

server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);