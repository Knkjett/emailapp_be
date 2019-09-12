const express = require('express');
const sendgridRouter = express.Router();
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
  sgMail.send(msg);
  res.status(200)
});



module.exports = sendgridRouter;
