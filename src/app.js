const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
const registrationRoutes = require('./routes/registrationRoutes'); // استيراد

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/registrations', registrationRoutes); // تفعيل الـ Registration Routes

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Event Registration System API!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running successfully on port ${PORT}`);
});