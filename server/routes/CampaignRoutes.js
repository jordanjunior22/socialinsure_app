const express = require('express');
const router = express.Router();
const Campaign = require('../model/Campaign');
const User = require('../model/UserModel')
// Route for saving contribution data

router.get('/campaign/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'This User Cannot Perform This Operation.' });
      }
      const campaignData = await Campaign.find();
      res.json(campaignData);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.put('/campaign/:userId/update', async (req, res) => {
    const userId = req.params.userId;
    const updateParams = req.body;
    const campaignId = updateParams.campaign_id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'This User Cannot Perform This Operation.' });
      }
      const campaign = await Campaign.findById(campaignId); 
      if (!campaign) {
        return res.status(404).json({ message: 'Campaign not found.' });
      }

      const currentRaised = Number(campaign.raised); 
      const updatedRaised = (currentRaised + Number(updateParams.amount));

      const updatedCampaign = await Campaign.findByIdAndUpdate(
        campaignId,
        { raised: updatedRaised },
        { new: true }
      );

      if (updatedCampaign) {
        res.status(200).json({ message: 'updated successfully.' });
        console.log("success");
      } else {
        res.status(404).json({ message: 'User not found.' });
      }

    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports = router;