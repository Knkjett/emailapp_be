const {db} = require('./dbConnect');
const contact_listService = {};

// CREATE
contact_listService.create = (uuid, host, contact) =>{
  return db.one('INSERT INTO contact_list (uuid, host, contact) VALUES (${uuid}, ${host}, ${contact}) RETURNING uuid;',{
    uuid, host, contact
  });
}

// READ ALL CONTACTS FROM HOST
contact_listService.getContacts = (uuid) =>{
  return db.any ('SELECT * from contact_list WHERE host=${uuid}',{
    uuid
  });
}

// DELETE
contact_listService.delete = (uuid) =>{
  return db.none ('DELETE FROM contact_list WHERE uuid=${uuid}',{
    uuid
  })
}

module.exports = contact_listService;