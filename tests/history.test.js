//===DATA TEST===
jest.mock('../services/dbConnect')
const {
  db
} = require('../services/dbConnect')
const historyService = require('../services/history')

test('User POST Request', done => {
  db.one.mockImplementation((...rest) => Promise.resolve())
  historyService.create('myuuid-123-456','sender@email.com','reciever@email.com','content_id')
    .then(() => {
      expect(db.one.mock.calls[0][0]).toBe('INSERT INTO history (uuid, sender, reciever, content) VALUES (${uuid}, ${sender}, ${reciever}, ${content}) RETURNING reciever;');
      expect(db.one.mock.calls[0][1]).toEqual({
        'uuid': 'myuuid-123-456',
        'sender': 'sender@email.com',
        'reciever': 'reciever@email.com',
        'content':'content_id',
      });
      done()
    })
})

test('User GET SENT Request', done => {
  db.any.mockImplementation((...rest) => Promise.resolve())
  historyService.readSent('sender@email.com')
    .then(() => {
      expect(db.any.mock.calls[0][0]).toBe('SELECT * from history WHERE sender=${uuid}');
      expect(db.any.mock.calls[0][1]).toEqual({
        'uuid':'sender@email.com'
      });
      done()
    })
})

test('User GET RECIEVER Request', done => {
  db.any.mockImplementation((...rest) => Promise.resolve())
  historyService.readRecieve('reciever@email.com')
    .then(() => {
      expect(db.any.mock.calls[1][0]).toBe('SELECT * from history WHERE reciever=${uuid}');
      expect(db.any.mock.calls[1][1]).toEqual({
        'uuid':'reciever@email.com'
      });
      done()
    })
})

// // //===CONNECTION ROUTE TEST===
const request = require('supertest');
const {app} = require('../app');
test('connecting to User POST',done => {
  request(app)
  .post('/history/')
  .then((res)=>{
    expect(res.status).toBe(201);
    done();
  })
})
test('connecting to User GET Sent',done => {
  request(app)
  .get('/history/sent/myuuid-123-456')
  .then((res)=>{
    expect(res.status).toBe(200);
    done();
  })
})
test('connecting to User GET Reciever',done => {
  request(app)
  .get('/history/recieved/myuuid-123-456')
  .then((res)=>{
    expect(res.status).toBe(200);
    done();
  })
})


// // //===REJECT===
test('connecting to User POST Request', done => {
  db.one.mockImplementation((...rest) => Promise.reject())
  request(app)
  .post('/history/')
    .then((res) => {
      expect(res.status).toBe(400);
    done();
    })
})
test('connecting to User GET Sent Request', done => {
  db.any.mockImplementation((...rest) => Promise.reject())
  request(app)
  .get('/history/sent/uuid-123-456')
    .then((res) => {
      expect(res.status).toBe(400);
    done();
    })
})
test('connecting to User GET Recieved Request', done => {
  db.any.mockImplementation((...rest) => Promise.reject())
  request(app)
  .get('/history/recieved/uuid-123-456')
    .then((res) => {
      expect(res.status).toBe(400);
    done();
    })
})