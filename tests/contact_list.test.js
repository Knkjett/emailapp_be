//===DATA TEST===
jest.mock('../services/dbConnect')
const {
  db
} = require('../services/dbConnect')
const contact_ListService = require('../services/contact_list')

test('Contact List POST Request', done => {
  db.one.mockImplementation((...rest) => Promise.resolve())
  contact_ListService.create('myuuid-123-456','host-123-456','contact-123-456','friend')
    .then(() => {
      expect(db.one.mock.calls[0][0]).toBe('INSERT INTO contact_list (uuid, host, contact, category) VALUES (${uuid}, ${host}, ${contact}, ${category}) RETURNING host, contact, category;');
      expect(db.one.mock.calls[0][1]).toEqual({
        'uuid': 'myuuid-123-456',
        'host': 'host-123-456',
        'contact': 'contact-123-456',
        'category':'friend',
      });
      done()
    })
})

test('Contact List GET All contacts from host Request', done => {
  db.any.mockImplementation((...rest) => Promise.resolve())
  contact_ListService.getContacts('host-123-456')
    .then(() => {
      expect(db.any.mock.calls[0][0]).toBe('SELECT * from contact_list WHERE host=${uuid}');
      expect(db.any.mock.calls[0][1]).toEqual({
        'uuid':'host-123-456'
      });
      done()
    })
})

test('Contact List UPDATE Request', done => {
  db.none.mockImplementation((...rest) => Promise.resolve())
  contact_ListService.update('myuuid-123-456','family')
    .then(() => {
      expect(db.none.mock.calls[0][0]).toBe('UPDATE contact_list SET category = ${category} WHERE uuid=${uuid}')
      expect(db.none.mock.calls[0][1]).toEqual({
        'uuid': 'myuuid-123-456',
        'category': 'family'
      });
      done()
    })
})

test('Contact List DELETE Request', done => {
  db.none.mockImplementation((...rest) => Promise.resolve())
  contact_ListService.delete('uuid-333')
    .then(() => {
      expect(db.none.mock.calls[1][0]).toBe('DELETE FROM contact_list WHERE uuid=${uuid}')
      expect(db.none.mock.calls[1][1]).toEqual({
        'uuid': 'uuid-333'
      });
      done()
    })
})

// ===CONNECTION ROUTE TEST===
const request = require('supertest');
const {app} = require('../app');
test('connecting to Contact List POST',done => {
  request(app)
  .post('/contact_list/')
  .then((res)=>{
    expect(res.status).toBe(201);
    done();
  })
})
test('connecting to Contact List GET',done => {
  request(app)
  .get('/contact_list/myuuid-123-456')
  .then((res)=>{
    expect(res.status).toBe(200);
    done();
  })
})
test('connecting to Contact List PUT',done => {
  request(app)
  .put('/contact_list/myuuid-123-456')
  .then((res)=>{
    expect(res.status).toBe(201);
    done();
  })
})
test('connecting to Contact List DELETE',done => {
  request(app)
  .delete('/contact_list/myuuid-123-456')
  .then((res)=>{
    expect(res.status).toBe(201);
    done();
  })
})

// ===REJECT===
test('connecting to Contact List POST Request', done => {
  db.one.mockImplementation((...rest) => Promise.reject())
  request(app)
  .post('/contact_list/')
    .then((res) => {
      expect(res.status).toBe(400);
    done();
    })
})
test('connecting to Contact List GET Request', done => {
  db.any.mockImplementation((...rest) => Promise.reject())
  request(app)
  .get('/contact_list/uuid-123-456')
    .then((res) => {
      expect(res.status).toBe(400);
    done();
    })
})
test('connecting to Contact List PUT Request', done => {
  db.none.mockImplementation((...rest) => Promise.reject())
  request(app)
  .put('/contact_list/uuid-123-456')
    .then((res) => {
      expect(res.status).toBe(400);
    done();
    })
})
test('connecting to Contact List DELETE Request', done => {
  db.none.mockImplementation((...rest) => Promise.reject())
  request(app)
  .delete('/contact_list/uuid-123-456')
    .then((res) => {
      expect(res.status).toBe(400);
    done();
    })
})
