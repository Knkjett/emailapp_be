const express = require('express');
const userRouter = express.Router();
const UserService = require('../services/users');
const uuidv1 = require('uuid/v1');

// POST - CREATE 
userRouter.post('/', (req, res) => {
  const {email, area_code, phone_number, token} = req.body;
  let uuid = uuidv1();
  UserService.create(uuid, email, area_code, phone_number, token)
    .then(data => {
      res.status(201);
      res.send(data);
    })
    .catch(err => {
      res.status(400);
      res.send({"Message":err})
    })
});

// GET - READ 
userRouter.get('/:token', (req, res) => {
  const {token} = req.params;
  UserService.read(token)
    .then(data => {
      res.status(200);
      res.send(data);
    })
    .catch(err => {
      res.status(400);
      res.send({"Message":err})
    })
});

// GET - READ BY UUID
userRouter.get('/contact/:uuid', (req, res) => {
  const {uuid} = req.params;
  UserService.readUUID(uuid)
    .then(data => {
      res.status(200);
      res.send(data);
    })
    .catch(err => {
      res.status(400);
      res.send({"Message":err})
    })
});

userRouter.get('/email/:email', (req, res) => {
  const {email} = req.params;
  UserService.readEmail(email)
    .then(data => {
      res.status(200);
      res.send(data);
    })
    .catch(err => {
      res.status(400);
      res.send({"Message":err})
    })
});

// PUT - UPDATE
userRouter.put('/:uuid', (req, res) => {
  const {uuid} = req.params
  const {email, area_code, phone_number, token} = req.body;
  UserService.update(uuid, email, area_code, phone_number, token)
    .then(data => {
      res.status(201);
      res.send(data);
    })
    .catch(err => {
      res.status(400);
      res.send({"Message":err})
    })
});

// DELETE - DELETE
userRouter.delete('/:uuid',(req,res)=>{
  const {uuid} = req.params;
  UserService.delete(uuid)
  .then(()=>{
    res.status(201)
    res.send(`Email has been removed from the system.`)
  })
  .catch(err =>{
    res.status(400);
    res.send({"Message":err})
  })
})

module.exports = userRouter;
