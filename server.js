const express = require('express');
const dotenv = require('dotenv');
// const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const requestRoutes = require('./routes/requestRoutes');
const offerRoutes = require('./routes/offerRoutes');
const communityRoutes = require('./routes/communityRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');

const helpCategoryRoutes = require('./routes/helpCategoryRoutes');
const helpTypeRoutes = require('./routes/helpTypeRoutes');

const mainCommunityRoutes = require('./routes/mainCommunityRoutes');

dotenv.config();

// const PORT = process.env.PORT || 5000;
// const JWT_SECRET = process.env.JWT_SECRET;
// const API_KEY = process.env.API_KEY;

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/request', requestRoutes);
app.use('/api/offer', offerRoutes);
app.use('/api/volunteer', volunteerRoutes);
app.use('/api/community', communityRoutes);

app.use('/api/help-category', helpCategoryRoutes);
app.use('/api/help-type', helpTypeRoutes);

app.use('/api/main-community', mainCommunityRoutes);

// Test base route
app.get('/', (req, res) => {
    res.send('Welcome to the app!');
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});