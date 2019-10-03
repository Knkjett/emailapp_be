const express = require('express');
const stripeRouter = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SP_KEY);


stripeRouter.post("/charge", async (req, res) => {
  // console.log(req.body)
  let error;
  let status = 'failed';
  try {
    const {
      product,
      currency = 'usd',
      description,
      email,
      id,
      type,
      amountOther
    } = req.body.token;

    let amount = 100;
    if (product === 'five') 
      amount = amount * 5;
    else if (product === 'ten')
      amount = amount * 10;
    else if (product === 'other')
    amount = amountOther

    const customer = await stripe.customers.create({
      email: email,
      source: id,
    });

    if (type === 'card') {
      const charge = await stripe.charges.create(
        {
          amount,
          currency: currency,
          customer: customer.id,
          description: description,
        },
      );
      // console.log('charge:');
      // console.log(charge);
    } else {
      throw Error(`Unrecognized Stripe token type: "${type}"`);
    }

    status = 'success';
  } catch (err) {
    // console.error(err);
    error = err;
  }

  res.json({ error, status });
});

module.exports = stripeRouter;
