const express = require('express');
const Sponsor = require('../model/Sponsor'); 
const router = express.Router();

router.get('/sponsor', async (req, res) => {
  try {
    const sponsor = await Sponsor.find();
    res.json(sponsor);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
