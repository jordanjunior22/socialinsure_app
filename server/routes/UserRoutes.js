const express = require('express');
const User = require('../model/UserModel'); // Assuming you have the User model in models/User.js
const router = express.Router();
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

router.get('/well-being-subscribers', async (req, res) => {
  try {
    const count = await User.countDocuments({ isAWellBeingSubscriber: true });
    res.json({ totalWellBeingSubscribers: count });
  } catch (error) {
    console.error("Error counting well-being subscribers:", error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/register', async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    imageUrl,
    isAWellBeingSubscriber,
    isVerified,
    balance,
    isBlackListed,
    emailVerified,
  } = req.body; // Read user data from the request body

  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already in use.' });
    }
    
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      imageUrl,
      isAWellBeingSubscriber,
      isVerified,
      balance,
      isBlackListed,
      emailVerified,
    }); 

    await newUser.save(); 
    res.status(201).json({ message: 'User registered successfully.' }); 
  } catch (error) {
    res.status(500).json({ message: 'Error registering user.', error: error.message });
  }
});

// Find a user by email
router.get('/user/:email', async (req, res) => {
  const email = req.params.email; // Get the email from the URL parameter
  console.log("email recieved from front ",email);
  try {
    const user = await User.findOne({ email }); // Find a user by email 
    if (user) {
      res.status(200).json(user); // Return the user data if found
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error finding user.', error: error.message }); // Handle errors
  }
});

router.put('/user/:userId/update', async (req, res) => {
  const userId = req.params.userId;
  const updateParams = req.body;
  //iam trying to update the balance in mongo db but i need to get current balance, do and arithmetic before i update
  // console.log(userId)
  // console.log(updateParams)

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const currentBalance = Number(user.balance); 
    const updatedBalance = (currentBalance + Number(updateParams.balance));

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { balance: updatedBalance },
      { new: true }
    );

    if (updatedUser) {
      res.status(200).json({ user: updatedUser, message: 'updated successfully.' });
      console.log("success");
    } else {
      res.status(404).json({ message: 'User not found.' });
    }

  } catch (error) {
    res.status(500).json({ message: 'Error updating phone number.', error: error.message });
  }
});

router.post('/uploadprofile', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const filePath = req.file.path; // Get the path of the uploaded file
    const result = await cloudinary.uploader.upload(filePath, { 
      resource_type: 'image',
    });

    const imageUrl = result.secure_url;
    const userId = req.body.userId;

    // Get the current user to retrieve the existing Cloudinary public ID
    const currentUser = await User.findById(userId);

    // Check if the user already has an image URL
    if (currentUser.imageUrl) {
      // Extract the public ID from the existing image URL
      const publicId = currentUser.imageUrl.split('/').pop().split('.')[0];
      
      // Update the existing image on Cloudinary
      await cloudinary.uploader.destroy(publicId); // Delete the existing image
    }

    // Update the user's imageUrl with the new Cloudinary URL
    const updatedUser = await User.findByIdAndUpdate( 
      userId,
      { imageUrl },
      { new: true }
    );

    // After successful update to Cloudinary, remove the local file
    fs.unlinkSync(filePath);

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



module.exports = router; 
