//===DATA TEST===
jest.mock('../services/dbConnect')
const {
  db
} = require('../services/dbConnect')
const userService = require('../services/users')

test('User POST Request', done => {
  db.one.mockImplementation((...rest) => Promise.resolve())
  userService.create('myuuid-123-456','test@email.com',718,1234567, 'sptoken')
    .then(() => {
      expect(db.one.mock.calls[0][0]).toBe('INSERT INTO users (uuid, email, area_code, phone_number, token) VALUES (${uuid}, ${email}, ${area_code}, ${phone_number}, ${token}) RETURNING uuid;');
      expect(db.one.mock.calls[0][1]).toEqual({
        'uuid': 'myuuid-123-456',
        'email': 'test@email.com',
        'area_code': 718,
        'phone_number':1234567,
        'token': 'sptoken'
      });
      done()
    })
})

test('User GET Request', done => {
  db.one.mockImplementation((...rest) => Promise.resolve())
  userService.read('test@email.com')
    .then(() => {
      expect(db.one.mock.calls[1][0]).toBe('SELECT * from users WHERE email=${email}');
      expect(db.one.mock.calls[1][1]).toEqual({
        'email':'test@email.com'
      });
      done()
    })
})
test('User UPDATE Request', done => {
  db.none.mockImplementation((...rest) => Promise.resolve())
  userService.update('myuuid-123-456', 'notaemail@email.com',null,null, 'notsp')
    .then(() => {
      expect(db.none.mock.calls[0][0]).toBe('UPDATE users SET email = ${email}, area_code = ${area_code}, phone_number = ${phone_number}, token = ${token} WHERE uuid=${uuid}')
      expect(db.none.mock.calls[0][1]).toEqual({
        'uuid': 'myuuid-123-456',
        'email': 'notaemail@email.com',
        'area_code':null,
        'phone_number':null,
        'token': 'notsp'
      });
      done()
    })
})
test('User DELETE Request', done => {
  db.none.mockImplementation((...rest) => Promise.resolve())
  userService.delete('uuid-333')
    .then(() => {
      expect(db.none.mock.calls[1][0]).toBe('DELETE FROM users WHERE uuid=${uuid}')
      expect(db.none.mock.calls[1][1]).toEqual({
        'uuid': 'uuid-333'
      });
      done()
    })
})

// //===CONNECTION ROUTE TEST===
const request = require('supertest');
const {app} = require('../app');
test('connecting to User POST',done => {
  request(app)
  .post('/users/')
  .then((res)=>{
    expect(res.status).toBe(201);
    done();
  })
})
test('connecting to User GET',done => {
  request(app)
  .get('/users/test@gmail.com')
  .then((res)=>{
    expect(res.status).toBe(200);
    done();
  })
})
test('connecting to User PUT',done => {
  request(app)
  .put('/users/myuuid-123-456')
  .then((res)=>{
    expect(res.status).toBe(201);
    done();
  })
})
test('connecting to User DELETE',done => {
  request(app)
  .delete('/users/myuuid-333')
  .then((res)=>{
    expect(res.status).toBe(201);
    done();
  })
})

// //===REJECT===
test('connecting to User POST Request', done => {
  db.one.mockImplementation((...rest) => Promise.reject())
  request(app)
  .post('/users/')
    .then((res) => {
      expect(res.status).toBe(400);
    done();
    })
})
test('connecting to User GET Request', done => {
  db.one.mockImplementation((...rest) => Promise.reject())
  request(app)
  .get('/users/test@gmail.com')
    .then((res) => {
      expect(res.status).toBe(400);
    done();
    })
})
test('connecting to User PUT Request', done => {
  db.none.mockImplementation((...rest) => Promise.reject())
  request(app)
  .put('/users/myuuid-123-456')
    .then((res) => {
      expect(res.status).toBe(400);
    done();
    })
})
test('connecting to User DELETE Request', done => {
  db.none.mockImplementation((...rest) => Promise.reject())
  request(app)
  .delete('/users/myuuid-123-456')
    .then((res) => {
      expect(res.status).toBe(400);
    done();
    })
})