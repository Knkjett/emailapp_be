const {db} = require('./dbConnect');
const historyService = {};

// CREATE
historyService.create = (uuid, sender, reciever, content) =>{
  return db.one('INSERT INTO history (uuid, sender, reciever, content) VALUES (${uuid}, ${sender}, ${reciever}, ${content}) RETURNING reciever;',{
    uuid, sender, reciever, content
  });
}

// READ SENT MESSAGES
historyService.readSent = (uuid) =>{
  return db.any ('SELECT * from history WHERE sender=${uuid}',{
    uuid
  });
}

// READ RECIEVED MESSAGES
historyService.readRecieve = (uuid) =>{
  return db.any ('SELECT * from history WHERE reciever=${uuid}',{
    uuid
  });
}

module.exports = historyService;