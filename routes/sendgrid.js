const express = require('express');
const sendgridRouter = express.Router();
require('dotenv').config()
const sgMail = require('@sendgrid/mail');


sendgridRouter.get('/', (req, res) => {
  const {sender, reciever} = req.body;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: reciever,
    from: sender,
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail.send(msg)
  .then((data)=>{
    res.status(200)
    res.json({msg:"Sent mail", data})
  })
  .catch((err)=>{
    res.status(400)
    res.json({error: err})
  })
});



module.exports = sendgridRouter;
