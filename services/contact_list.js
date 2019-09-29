const {db} = require('./dbConnect');
const contact_listService = {};

// CREATE
contact_listService.create = (uuid, host, contact,first_name, last_name, category) =>{
  return db.one('INSERT INTO contact_list (uuid, host, contact,first_name, last_name, category) VALUES (${uuid}, ${host}, ${contact}, ${first_name}, ${last_name}, ${category}) RETURNING host, contact, category;',{
    uuid, host, contact, first_name, last_name, category
  });
}

// READ ALL CONTACTS FROM HOST
contact_listService.getContacts = (uuid) =>{
  return db.any ('SELECT * from contact_list WHERE host=${uuid}',{
    uuid
  });
}

// UPDATE CATEGORY
contact_listService.update = (uuid,first_name, last_name, category) =>{
  return db.none('UPDATE contact_list SET first_name= ${first_name}, last_name=${last_name}, category = ${category} WHERE uuid=${uuid}',{
    uuid,first_name, last_name, category
  });
}

// DELETE
contact_listService.delete = (uuid) =>{
  return db.none ('DELETE FROM contact_list WHERE uuid=${uuid}',{
    uuid
  })
}

module.exports = contact_listService;