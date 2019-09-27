require('dotenv').config()
const sgMail = require('@sendgrid/mail');
const sendGridService = {};


sendGridService.sendmail = (sender, reciever, template) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  return new Promise((resolve, reject) => {
    if (sender && reciever) {
      resolve({
        to: reciever,
        from: sender,
        templateId: template,
        dynamic_template_data:
        {
          "recipientName": recipientName  ,
          "senderName": senderName  ,
          "beneficiary":beneficiary
        }
      });
    } else {
      reject({err:"Missing Sender or Reciever"});
    }
  });
};

module.exports = sendGridService;