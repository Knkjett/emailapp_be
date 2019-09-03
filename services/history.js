const {db} = require('./dbConnect');
const historyService = {};

// CREATE
historyService.create = (uuid, sender, reciever, content) =>{
  return db.one('INSERT INTO history (uuid, sender, reciever, content) VALUES (${uuid}, ${sender}, ${reciever}, ${content}) RETURNING reciever;',{
    uuid, sender, reciever, content
  });
}

// READ
historyService.read = (uuid) =>{
  return db.one ('SELECT * from history WHERE uuid=${uuid}',{
    uuid
  });
}

module.exports = historyService;