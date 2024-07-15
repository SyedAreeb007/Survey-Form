// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://syedareeb445:Servicepoint786.@cluster0.rcedemg.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'RailFoodSurvey'
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

// Define a schema for survey responses
const surveyResponseSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  responses: [{
    Question: String,
    Answer: String
  }]
});

// Create a model based on the schema
const SurveyResponse = mongoose.model('SurveyResponse', surveyResponseSchema);

// API endpoint to store form data
app.post('/storeFormData', async (req, res) => {
  try {
    const formData = req.body; // Assuming formData is sent as JSON in the request body

    // Create new SurveyResponse instance
    const newResponse = new SurveyResponse({
      name: formData.name,
      email: formData.email,
      contact: formData.contact,
      responses: formData.responses // Assuming responses is an array of objects { Question, Answer }
    });

    // Save the new response to MongoDB
    await newResponse.save();

    res.status(201).json({ message: 'Form data stored successfully' });
  } catch (error) {
    console.error('Failed to store form data:', error);
    res.status(500).json({ message: 'Failed to store form data' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
