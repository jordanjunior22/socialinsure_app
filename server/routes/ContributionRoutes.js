const express = require('express');
const router = express.Router();
const Contribution = require('../model/Contribution');
const User = require('../model/UserModel');
const Campaign = require('../model/Campaign')
const stripe = require('stripe')(process.env.STRIPE_SECRETE);

// Route for saving contribution data
router.post('/contributions', async (req, res) => {
  try {
    const ContributionData = req.body; // Assuming request body contains contribution data
    const { amount,campaign_id } = ContributionData;

    await Campaign.findOneAndUpdate(
      { _id: campaign_id },
      { $inc: { raised: amount } }, // Increment raised by the amount
      { new: true }
    );

    const newContribution = new Contribution(ContributionData);
    const savedContribution = await newContribution.save();
    res.status(201).json(savedContribution);
  } catch (error) {
    res.status(500).json({ message: error.message });
    //console.error(error.message)
  }
});

router.post('/contributions_handlebalance', async (req, res) => {
  try {
    const ContributionData = req.body; // Assuming request body contains contribution data
    const { user_id, amount, campaign_id } = ContributionData;
    await Campaign.findOneAndUpdate(
      { _id: campaign_id },
      { $inc: { raised: amount } }, // Increment raised by the amount
      { new: true }
    );
    //console.log(user_id);
    //console.log(amount);
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const updatedbalance = user.balance - amount;
    await User.findByIdAndUpdate(user_id, { balance: updatedbalance });
    //console.log(ContributionData)
    const newContribution = new Contribution(ContributionData);
    const savedContribution = await newContribution.save();
    res.status(201).json(savedContribution);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error.message)
  }
});

router.post('/constribution-stripe-payment', async (req, res) => {
  try{
      const { metaData, amount, currency} = req.body;
      const amountInCents = amount * 100;
      
      //console.log(amount)
      //console.log(amountInCents)
      

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
          title: metaData.title,
          user_id: metaData.user_id,
          fullName:metaData.fullName,
          email:metaData.email,
          amount:metaData.amount,
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


// Route for retrieving contributions based on user ID
router.get('/contributions/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const contributions = await Contribution.find({ user_id: userId });
    // if (contributions.length === 0) {
    //   return res.status(404).json({ message: "Contributions not found for this user ID." });
    // }
    res.json(contributions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/sum-contributions/:featureId', async (req, res) => {
  const { featureId } = req.params;

  try {
    // Step 1: Filter campaigns by feature_id
    const campaigns = await Campaign.find({ feature_id: featureId });

    // Step 2: Sum contributions for filtered campaigns
    const campaignIds = campaigns.map(campaign => campaign._id);
    const contributions = await Contribution.aggregate([
      { $match: { campaign_id: { $in: campaignIds } } },
      { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
    ]);

    const totalAmount = contributions.length > 0 ? contributions[0].totalAmount : 0;

    // Respond with the total amount
    res.json({ totalAmount });
  } catch (error) {
    console.error('Error filtering campaigns and summing contributions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;