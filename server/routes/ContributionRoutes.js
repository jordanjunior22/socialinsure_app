const express = require('express');
const router = express.Router();
const Contribution = require('../model/Contribution');
const User = require('../model/UserModel');

// Route for saving contribution data
router.post('/contributions', async (req, res) => {
  try {
    const ContributionData = req.body; // Assuming request body contains contribution data
    //console.log(ContributionData)
    const newContribution = new Contribution(ContributionData);
    const savedContribution = await newContribution.save();
    res.status(201).json(savedContribution);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.error(error.message)
  }
});

router.post('/contributions_handlebalance', async (req, res) => {
  try {
    const ContributionData = req.body; // Assuming request body contains contribution data
    const { user_id, amount } = ContributionData;
    console.log(user_id);
    console.log(amount);
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
    res.status(400).json({ message: error.message });
    console.error(error.message)
  }
});

// Route for retrieving contributions based on user ID
router.get('/contributions/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const contributions = await Contribution.find({ user_id: userId });
    if (contributions.length === 0) {
      return res.status(404).json({ message: "Contributions not found for this user ID." });
    }
    res.json(contributions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;