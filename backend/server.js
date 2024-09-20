const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();


app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/movies', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define user schema and model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

// Register route
app.post('/register', async (req, res) => {
    const { name, email, phone, password } = req.body;

    const user = new User({
        name,
        email,
        phone,
        password,
    });

    try {
        await user.save();
        res.status(200).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Perform authentication logic
    const user = await User.findOne({ email }); // Sample user lookup

    if (!user || user.password !== password) {
        // Return a 401 Unauthorized error for invalid credentials
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    // If authentication is successful, send back user details
    res.status(200).json({ username: user.name, role: user.role });
});


// Start the server
app.listen(3001, () => {
    console.log('Server running on port 3001');
});
