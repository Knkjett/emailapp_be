const SendGridService = require('../services/sendgrid')

test('Sendgrid send email Service', done => {
  SendGridService.sendmail('sender@gmail.com', 'test@email.com', 'templateID').then(data => {
    expect(data).toEqual({
      to: 'test@email.com',
      from: 'sender@gmail.com',
      subject: 'Welcome to Company Name',
      templateId: 'templateID',
    });
    done()
  })
});

test('Sendgrid send email fail Service', done => {
  SendGridService.sendmail('sender@gmail.com').catch(data => {
    expect(data).toEqual({
      err: "Missing Sender or Reciever",
    });
    done()
  })
});


// Route Test
const request = require('supertest');
const {
  app
} = require('../app');
test('connecting to SENDGRID GET', done => {
  let data = {
    sender: 'sender@gmail.com',
    reciever: 'reciever@gmail.com'
  }
  request(app)
    .post('/sendgrid')
    .send(data)
    .then((res) => {
      expect(res.status).toBe(200);
      done();
    })
})

test('connecting to SENDGRID GET Reject', done => {
  jest.fn().mockImplementation(() => Promise.reject());
  request(app)
    .post('/sendgrid')
    .then((res) => {
      expect(res.status).toBe(400);
      done();
    })
})