const express = require('express');
const dotenv = require('dotenv');
// const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const communityRoutes = require('./routes/communityRoutes');
const offerRoutes = require('./routes/offerRoutes');
const requestRoutes = require('./routes/requestRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');

dotenv.config();

// const PORT = process.env.PORT || 5000;
// const JWT_SECRET = process.env.JWT_SECRET;
// const API_KEY = process.env.API_KEY;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/community', communityRoutes);
app.use('/api/offer', offerRoutes);
app.use('/api/request', requestRoutes);
app.use('/api/volunteer', volunteerRoutes);

// Test base route
app.get('/', (req, res) => {
    res.send('Welcome to the app!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
