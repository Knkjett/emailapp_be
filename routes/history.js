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
      res.send({
        "Message": `Email sent.`, 
        "data": data
        });
    })
    .catch(err => {
      res.status(400);
      res.send({"Message":err})
    })
});

// GET - READ 
historyRouter.get('/sent/:uuid', (req, res) => {
  const {uuid} = req.params;
  HistoryService.readSent(uuid)
    .then(data => {
      res.status(200);
      res.send(data);
    })
    .catch(err => {
      res.status(400);
      res.send({"Message":err})
    })
});

historyRouter.get('/recieved/:uuid', (req, res) => {
  const {uuid} = req.params;
  HistoryService.readRecieve(uuid)
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
