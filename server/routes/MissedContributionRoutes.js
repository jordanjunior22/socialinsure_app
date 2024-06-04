const express = require('express');
const router = express.Router();
const MissedContribution = require('../model/MissedContribution');
const Contribution = require('../model/Contribution')
const Campaign = require('../model/Campaign')
const User = require('../model/UserModel');

router.post('/paid-contributions', async (req, res) => {
    try {
        const { contributionDataArray } = req.body;

        // Save contributions with paymentId
        const savedContributions = await Promise.all(
            contributionDataArray.map(async contributionData => {
                const newContribution = new Contribution(contributionData);
                return await newContribution.save();
            })
        );

        // Update campaign raised amount for each contribution
        await Promise.all(
            contributionDataArray.map(async contributionData => {
                const { campaign_id, amount } = contributionData;
                const campaign = await Campaign.findById(campaign_id);
                if (!campaign) {
                    throw new Error('Campaign not found');
                }
                campaign.raised += amount;
                await campaign.save();
            })
        );

        // Extract userId from the first contribution in contributionDataArray
        const userId = contributionDataArray[0].user_id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user's subscription status
        user.isAWellBeingSubscriber = true;
        await user.save();
        // Delete missed contributions associated with the user
        await MissedContribution.deleteMany({ user_id: userId });
        res.status(201).json(savedContributions);

    } catch (error) {
        res.status(400).json({ message: error.message });
        console.error(error.message);
    }
});

router.post('/paid-contributions-balance', async (req, res) => {
    try {
        const { contributionDataArrayBalance,total } = req.body;

        // Save contributions with paymentId
        const savedContributions = await Promise.all(
            contributionDataArrayBalance.map(async contributionData => {
                const newContribution = new Contribution(contributionData);
                return await newContribution.save();
            })
        );

        // Update campaign raised amount for each contribution
        await Promise.all(
            contributionDataArrayBalance.map(async contributionData => {
                const { campaign_id, amount } = contributionData;
                const campaign = await Campaign.findById(campaign_id);
                if (!campaign) {
                    throw new Error('Campaign not found');
                }
                campaign.raised += amount;
                await campaign.save();
            })
        );

        // Extract userId from the first contribution in contributionDataArrayBalance
        const userId = contributionDataArrayBalance[0].user_id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user's subscription status
        user.isAWellBeingSubscriber = true;
        await user.save();
        const updatedbalance = user.balance - total;
        await User.findByIdAndUpdate(userId, { balance: updatedbalance });
        // Delete missed contributions associated with the user
        await MissedContribution.deleteMany({ user_id: userId });
        res.status(201).json(savedContributions);

    } catch (error) {
        res.status(400).json({ message: error.message });
        console.error(error.message);
    }
});

  

// Route to delete all contributions with user_id
router.delete('/missedContributions/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        
        // Delete all contributions with the specified user_id
        await MissedContribution.deleteMany({ user_id: userId });
        
        res.status(200).json({ message: 'Contributions deleted successfully' });
    } catch (error) {
        console.error('Error deleting contributions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/missedContributions/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const contributions = await MissedContribution.find({ user_id: userId });
        res.status(200).json(contributions);
    } catch (error) {
        console.error('Error fetching contributions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST route to handle missed contributions
router.post('/missedContribution', async (req, res) => {
    try {
        // Extract user_id and campaign_id from request body
        const { user_id, campaign_id } = req.body;

        // Check if a record with the same user_id and campaign_id exists
        const existingRecord = await MissedContribution.findOne({ user_id, campaign_id });

        if (!existingRecord) {
            const missedContribution = new MissedContribution({
                user_id,
                campaign_id
            });
            await missedContribution.save();
            res.status(201).json({ message: 'Missed contribution recorded successfully' });
        } else {
            // If a duplicate exists, return nothing (silently)
            res.status(204).end(); // 204 No Content
        }
    } catch (error) {
        console.error('Error recording missed contribution:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
