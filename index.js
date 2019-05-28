// implement your API here


const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
    const user = req.body;
    const {name,bio} = req.body
    if (name && bio) {
        db.insert(user)
        .then(user => {
             res.status(201).json(user)
        })
        .catch( err =>  { 
            res.status(500).json({ error: "There was an error while saving the user to the database"})
        })
    } else {
            res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }

})
 
server.get('/api/users', (req, res) => {
    db.find()
    .then(allUsers => {
        if(allUsers) {
            res.json(allUsers)
        } else {
            res.status(500).json({error: "The users information could not be retrieved."})
        }
        
    })
})

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params
    db.findById(id) 
        .then(foundUser => {
            if(foundUser) {
                db.findById(id).then( res.status(201).json(foundUser))
            } else {
                res.status(404).json( { error: "The user with the specified ID does not exist." })
            }   
        })
    .catch(err =>{
        res.status(404).json({ error : err, message: 'The user information could not be retrieved'})
     })
})

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params
    db.remove(id)
    .then( deleteUser => {
        if (deleteUser) {
            db.remove(id).then(res.status(201).json(deleteUser))
        } else {
            res.status(404).json( { error: "The user with the specified ID does not exist." })
        }
    })
    .catch(err => {
        res.status(500).json({error: "The user could not be removed"})
    })
})

server.put('/api/users/:id', (req, res) => {
    const{id} = req.params;
    const changes = req.body;
    const {name, bio} = req.body;

    if (name && bio) {
    db.update(id, changes)
    .then( changes => {
        if(changes) {
            db.findById(id).then(
                userUpdate => {
                    res.status(201).json(userUpdate)
                }
            )
        } else {
            res.status(400).json({error: "The user with the specified ID does not exist"})
        }
    })
    .catch(err => {
        res.status(404).json({error: "The user information could not be modified." })
    })
        } else {

            res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }
})



server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);