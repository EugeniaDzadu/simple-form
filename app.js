const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/simpleFormDB', {});

// Define a schema and model
const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/submit', async (req, res) => {
    const { firstname, lastname } = req.body;

    const newUser = new User({ firstname, lastname });
    try {
        await newUser.save();
        res.send('Data saved successfully!');
    } catch (err) {
        console.error(err);
        res.send('Error saving data.');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
