const express = require('express');
const contact_listRouter = express.Router();
const Contact_ListService = require('../services/contact_list');
const uuidv1 = require('uuid/v1');

// POST - CREATE 
contact_listRouter.post('/', (req, res) => {
  const {host, contact} = req.body;
  let uuid = uuidv1();
  Contact_ListService.create(uuid, host, contact)
    .then(data => {
      res.status(201);
      res.send(`Confirmed contact add: ${data}`);
    })
    .catch(err => {
      res.status(400);
      res.send({"Message":err})
    })
});

// GET - READ ALL CONTACT FROM HOST
contact_listRouter.get('/:uuid', (req, res) => {
  const {uuid} = req.params;
  Contact_ListService.getContacts(uuid)
    .then(data => {
      res.status(200);
      res.send(data);
    })
    .catch(err => {
      res.status(400);
      res.send({"Message":err})
    })
});

// DELETE - DELETE
contact_listRouter.delete('/:uuid',(req,res)=>{
  const {uuid} = req.params;
  Contact_ListService.delete(uuid)
  .then(()=>{
    res.status(201)
    res.send(`Contact has been removed from your list.`)
  })
  .catch(err =>{
    res.status(400);
    res.send({"Message":err})
  })
})



module.exports = contact_listRouter;
