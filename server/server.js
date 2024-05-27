require('dotenv').config(); // Load environment variables
const express = require('express'); // Import Express
const mongoose = require('mongoose'); // Import Mongoose
const bodyParser = require('body-parser'); // Import Body Parser
const app = express(); // Initialize the Express app
const cors = require('cors')


const userRoutes = require('./routes/UserRoutes'); // Import user routes
const VerficationRoutes = require('./routes/VerificationRoutes'); // Import user routes
const ContributionRoutes = require('./routes/ContributionRoutes')
const FeaturesRoutes = require('./routes/FeaturesRoutes')
const CampaignRoutes = require('./routes/CampaignRoutes')
const SponsorRoutes = require('./routes/SponsorRoutes')
const NotificationRoutes = require('./routes/NotificationRoutes')

app.use(cors());
app.use(bodyParser.json()); 

// Connect to MongoDB
const mongoURI = process.env.MONGO_URL;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Use user routes after middleware
app.use('/api', userRoutes); // Apply routes to the Express app
app.use('/api', VerficationRoutes);
app.use('/api', ContributionRoutes);
app.use('/api', FeaturesRoutes); //CampaignRoutes
app.use('/api', CampaignRoutes);
app.use('/api', SponsorRoutes) //NotificationRoutes
app.use('/api', NotificationRoutes) 


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); 
});
