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
const sendgridRouter = require('./routes/sendgrid')

// STRIPE
app.use(bodyParser.text())
const stripeRouter = require('./routes/stripe')


app.use('/users', userRouter);
app.use('/history', historyRouter);
app.use('/contact_list', contact_listRouter);
app.use('/sendgrid', sendgridRouter)
app.use('/stripe', stripeRouter)

module.exports = {app}