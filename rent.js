// rent.js
const { MongoClient } = require('mongodb');

// Connection string and options
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useUnifiedTopology: true });

let mongodb;

async function connectDB() {
  try {
    await client.connect();
    mongodb = client.db('carRental');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

connectDB();
