require('dotenv').config()
const sgMail = require('@sendgrid/mail');
const sendGridService = {};


sendGridService.sendmail = (sender, reciever) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  return new Promise((resolve, reject) => {
    if (sender && reciever) {
      resolve({
        to: reciever,
        from: sender,
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      });
    } else {
      reject({err:"Missing Sender or Reciever"});
    }
  });
};

module.exports = sendGridService;