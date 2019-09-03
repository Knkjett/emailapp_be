const express = require('express');
const historyRouter = express.Router();
const HistoryService = require('../services/history');
const uuidv1 = require('uuid/v1');

// POST - CREATE 
historyRouter.post('/', (req, res) => {
  const {sender, reciever, content} = req.body;
  let uuid = uuidv1();
  HistoryService.create(uuid, sender, reciever, content)
    .then(data => {
      res.status(201);
      res.send(`Email sent to ${data}`);
    })
    .catch(err => {
      res.status(400);
      res.send({"Message":err})
    })
});

// GET - READ 
historyRouter.get('/:uuid', (req, res) => {
  const {uuid} = req.params;
  HistoryService.read(uuid)
    .then(data => {
      res.status(200);
      res.send(data);
    })
    .catch(err => {
      res.status(400);
      res.send({"Message":err})
    })
});


module.exports = historyRouter;
