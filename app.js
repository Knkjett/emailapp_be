const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

  
// ROUTERS
const userRouter = require('./routes/users');
const historyRouter = require('./routes/history');
const contact_listRouter = require('./routes/contact_list');

app.use('/users', userRouter);
app.use('/history', historyRouter);
app.use('/contact_list', contact_listRouter);

module.exports = {app}