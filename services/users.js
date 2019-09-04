const {db} = require('./dbConnect');
const userService = {};

// CREATE
userService.create = (uuid,email, area_code, phone_number, token) =>{
  return db.one('INSERT INTO users (uuid, email, area_code, phone_number, token) VALUES (${uuid}, ${email}, ${area_code}, ${phone_number}, ${token}) RETURNING uuid;',{
    uuid, email, area_code, phone_number, token
  });
}

// READ
userService.read = (token) =>{
  return db.one ('SELECT * from users WHERE token=${token}',{
    token
  });
}

//UPDATE
userService.update = (uuid,email, area_code, phone_number, token) =>{
  return db.none('UPDATE users SET email = ${email}, area_code = ${area_code}, phone_number = ${phone_number}, token = ${token} WHERE uuid=${uuid}',{
    uuid,email, area_code, phone_number, token
  })
}

// DELETE
userService.delete = (uuid) =>{
  return db.none ('DELETE FROM users WHERE uuid=${uuid}',{
    uuid
  })
}

module.exports = userService;