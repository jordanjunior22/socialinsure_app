const express = require('express');
const router = express.Router();
const MissedContribution = require('../model/MissedContribution');
 

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
