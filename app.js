const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

  
// ROUTERS
const userRouter = require('./routes/users');

app.use('/users', userRouter);

module.exports = {app}