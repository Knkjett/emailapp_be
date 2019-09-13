const express = require('express');
const sendgridRouter = express.Router();
const SendGridService = require('../services/sendgrid');
const sgMail = require('@sendgrid/mail');



sendgridRouter.post('/', (req, res) => {
  const {sender, reciever} = req.body;
  SendGridService.sendmail(sender,reciever)
  .then((data)=>{
    sgMail.send(data)
    res.status(200)
    res.json({msg:"Sent mail", data})
  })
  .catch((err)=>{
    res.status(400)
    res.json({error: err})
  })
});



module.exports = sendgridRouter;