// test('Sendgrid email sent', done => {
 
// })


// Route Test
const request = require('supertest');
const {app} = require('../app');
test('connecting to SENDGRID GET',done => {
  request(app)
  .get('/sendgrid')
  .then((res)=>{
    expect(res.status).toBe(200);
    done();
  })
})