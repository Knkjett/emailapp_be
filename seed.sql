DROP DATABASE IF EXISTS emailapp;
CREATE DATABASE emailapp;

\c emailapp;

CREATE TABLE users (
  uuid TEXT NOT NULL,
  email VARCHAR DEFAULT NULL,
  area_code SMALLINT DEFAULT NULL,
  phone_number INT DEFAULT NULL,
  token TEXT NOT NULL,
  PRIMARY KEY (uuid)
);

CREATE TABLE history(
  uuid TEXT NOT NULL,
  sender TEXT REFERENCES users(uuid),
  reciever TEXT REFERENCES users(uuid),
  content TEXT DEFAULT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (uuid)
);

CREATE TABLE contact_list(
  uuid TEXT NOT NULL,
  host TEXT REFERENCES users(uuid) NOT NULL,
  contact TEXT REFERENCES users(uuid) NOT NULL,
//**  nickname TEXT DEFAULT NULL,**//
  category TEXT DEFAULT NULL,
  PRIMARY KEY (uuid)
);
