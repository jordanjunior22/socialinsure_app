const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRETE);

router.post('/re-subcribe-payment', async (req, res) => {
    try{
        const { metaData, amount, currency} = req.body;
        const amountInCents = amount * 100;


        const customer = await stripe.customers.create();
        const ephemeralKey = await stripe.ephemeralKeys.create(
          {customer: customer.id},
          {apiVersion: '2024-04-10'} 
        );

        const paymentIntent = await stripe.paymentIntents.create({ 
          amount: amountInCents,
          currency: 'usd',
          customer: customer.id,
          automatic_payment_methods: {
            enabled: true,
          },
          metadata:{
            user_id: metaData.userId,
            penalty: metaData.total
          }
        });
 
        console.log(paymentIntent); 
        res.json({
          paymentIntent: paymentIntent.client_secret, 
          ephemeralKey: ephemeralKey.secret,
          customer: customer.id,
          publishableKey: 'pk_test_51PGPDcDOkNDlRQgbiw90SlKMERk2TBW2jV4aQoEs0rgDcwNL0f9wN58MHwxyK8dqqJQ73voME0QXox0WTj9gf7rf00sRumEJQN',
          paymentIntentID: paymentIntent.id
        });

    }catch(error){
        console.log('Stripe Backend Error : ', error)
        res.status(500).json({ error: 'Stripe 500 Error ' });
    }

});

router.post('/top-up-payment', async (req, res) => {
  try{
      const { metaData, amount, currency} = req.body;
      const amountInCents = amount * 100;


      const customer = await stripe.customers.create();
      const ephemeralKey = await stripe.ephemeralKeys.create(
        {customer: customer.id},
        {apiVersion: '2024-04-10'} 
      );

      const paymentIntent = await stripe.paymentIntents.create({ 
        amount: amountInCents,
        currency: 'usd',
        customer: customer.id,
        automatic_payment_methods: {
          enabled: true,
        },
        metadata:{
          user_id: metaData.user_id,
          amount: metaData.amount,
          details: metaData.details,
          fullName: metaData.fullName,
          email : metaData.email
        }

      });

      console.log(paymentIntent); 
      res.json({
        paymentIntent: paymentIntent.client_secret, 
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publishableKey: 'pk_test_51PGPDcDOkNDlRQgbiw90SlKMERk2TBW2jV4aQoEs0rgDcwNL0f9wN58MHwxyK8dqqJQ73voME0QXox0WTj9gf7rf00sRumEJQN',
        paymentIntentID: paymentIntent.id
      });

  }catch(error){
      console.log('Stripe Backend Error : ', error)
      res.status(500).json({ error: 'Stripe 500 Error ' });
  }

});

module.exports = router; 