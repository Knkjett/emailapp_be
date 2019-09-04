const {db} = require('./dbConnect');
const contact_listService = {};

// CREATE
contact_listService.create = (uuid, host, contact, category) =>{
  return db.one('INSERT INTO contact_list (uuid, host, contact, category) VALUES (${uuid}, ${host}, ${contact}, ${category}) RETURNING host, contact, category;',{
    uuid, host, contact, category
  });
}

// READ ALL CONTACTS FROM HOST
contact_listService.getContacts = (uuid) =>{
  return db.any ('SELECT * from contact_list WHERE host=${uuid}',{
    uuid
  });
}

// UPDATE CATEGORY
contact_listService.update = (uuid, category) =>{
  return db.none('UPDATE contact_list SET category = ${category} WHERE uuid=${uuid}',{
    uuid, category
  });
}

// DELETE
contact_listService.delete = (uuid) =>{
  return db.none ('DELETE FROM contact_list WHERE uuid=${uuid}',{
    uuid
  })
}

module.exports = contact_listService;