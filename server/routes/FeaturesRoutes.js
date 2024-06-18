const express = require('express');
const Features = require('../model/Features'); 
const router = express.Router();

router.get('/features/:userId', async (req, res) => {
  try {
    const features = await Features.find();
    res.json(features);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get feature by ID
router.get('/features/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const feature = await Features.findById(id);
    if (!feature) {
      return res.status(404).json({ error: 'Feature not found' });
    }
    res.json(feature);
  } catch (error) {
    console.error('Error fetching feature by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;

