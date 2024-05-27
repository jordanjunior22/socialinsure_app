const express = require('express');
const Notification = require('../model/Notification'); 
const router = express.Router();

router.get('/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
