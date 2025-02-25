
require('dotenv').config();

const express = require('express');
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Express
const app = express();
app.use(express.json());

// MongoDB 
const dbUrl = 'mongodb://localhost:27017';
const dbClient = new MongoClient(dbUrl);
let db;

// Connect to MongoDB and start server
async function initServer() {
  try {
    await dbClient.connect();
    db = dbClient.db('carRental'); // Car Rental database
    console.log('MongoDB connected');
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
  }
}
initServer();

// Middleware
function checkAuth(req, res, next) {
  const header = req.headers['authorization'];
  const token = header && header.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // Add user info to req
    next();
  });
}

//Create new user
app.post('/register', async (req, res) => {
  const { name, email, username, password } = req.body;
  if (!name || !email || !username || !password) {
    return res.status(400).json({ message: 'Please fill all fields.' });
  }
  try {
    // Hash password
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = { name, email, username, password: hashedPass };
    const addedUser = await db.collection('users').insertOne(newUser);
    res.status(201).json({ message: 'User created', userId: addedUser.insertedId });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Register failed', error: error.message });
  }
});

// User login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required.' });
  }
  try {
    const foundUser = await db.collection('users').findOne({ username });
    if (!foundUser) return res.status(400).json({ message: 'User not found.' });

    // Check password
    const isValid = await bcrypt.compare(password, foundUser.password);
    if (!isValid) return res.status(400).json({ message: 'Wrong password.' });

    // Generate token
    const userToken = { username: foundUser.username, name: foundUser.name, email: foundUser.email };
    const token = jwt.sign(userToken, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

// Get user profile
app.get('/my-profile', checkAuth, (req, res) => {
  res.json({ name: req.user.name, username: req.user.username, email: req.user.email });
});

// Get rental cars 
app.get('/rental-cars', async (req, res) => {
  try {
    const { year, color, steering, seats } = req.query;
    const filters = {};
    if (year) filters.year = Number(year);
    if (color) filters.color = color;
    if (steering) filters.steering = steering;
    if (seats) filters.seats = Number(seats);

    const carList = await db.collection('cars')
      .find(filters)
      .sort({ price_per_day: 1 })
      .toArray();

    res.json(carList);
  } catch (error) {
    console.error('Error getting rental cars:', error);
    res.status(500).json({ message: 'Failed to get cars', error: error.message });
  }
});
