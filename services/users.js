const {db} = require('./dbConnect');
const userService = {};

// CREATE
userService.create = (uuid,email, area_code, phone_number, token) =>{
  return db.one('INSERT INTO users (uuid, email, area_code, phone_number, token) VALUES (${uuid}, ${email}, ${area_code}, ${phone_number}, ${token}) RETURNING uuid;',{
    uuid, email, area_code, phone_number, token
  });
}

// READ
userService.read = (email) =>{
  return db.one ('SELECT * from users WHERE email=${email}',{
    email
  });
}

//UPDATE
// userService.update = (email) =>{
//   return db.none('UPDATE users SET token = ${token} WHERE email=${email}',{
//     email,
//     
//   })
// }

// DELETE
userService.delete = (uuid) =>{
  return db.none ('DELETE FROM users WHERE uuid=${uuid}',{
    uuid
  })
}

module.exports = userService;