const express = require('express');
const router = express.Router();
const Verification = require('../model/Verification'); 
const stripe = require('stripe')(process.env.STRIPE_SECRETE);
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');
const fs = require('fs'); 

// Ensure the uploads directory exists
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true }); // Create the directory if it doesn't exist
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR); // Use the created uploads directory
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get the file extension
    const filename = `${Date.now()}${ext}`; // Unique filename with a timestamp
    cb(null, filename);
  },
});

const upload = multer({ storage });


cloudinary.config({ 
  cloud_name: 'dhxfi4g8s', 
  api_key: '751699583844473', 
  api_secret: 'ajWs2GzlZX_JNWTlYVXdE1dM3N4' 
});

router.post('/uploadid', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
      }
  
      const filePath = req.file.path; // Get the path of the uploaded file
      const result = await cloudinary.uploader.upload(filePath, { 
        resource_type: 'image',
      });
  
      const imageUrl = result.secure_url;
      
      fs.unlink(filePath, (error) => {
        if (error) {
            console.error('Error deleting file:', error);
        } else {
            console.log('File deleted successfully:', filePath);
        }
    });
  
      res.status(200).json({ url: imageUrl });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

router.get('/verification/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const verificationData = await Verification.findOne({ userId });
        // if (!verificationData) {
        //     return res.status(404).json({ error: 'Verification data not found for the user' });
        // }
        res.status(200).json(verificationData);
    } catch (error) {
        console.log('Error fetching verification data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/verification-docs', async (req, res) => {
    try{
        const {metaData,payment_id,idImageUrl} = req.body;

        const verification = new Verification({
            userId: metaData.user_id, // Assuming you have user authentication and req.user contains user data
            fullName: metaData.fullName,
            country: metaData.country,
            idImageUrl: idImageUrl,
            verificationMethod: metaData.verifMethod,
            subscriptionFee: metaData.SubscriptionFee,
            paymentId: payment_id,
            status : "Pending"
        });
        await verification.save();
        
        res.status(200).json({})
    }catch(error){
        console.log('Verification-docs',error);
        res.status(500).json({ error: 'Verification-docs 500 Error ' });
    }
})

router.post('/stripe-payment', async (req, res) => {
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
            feature: metaData.feature,
            user_id: metaData.user_id,
            fullName:metaData.fullName,
            email:metaData.email,
            verificationID:metaData.verifMethod,
            country:metaData.country
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