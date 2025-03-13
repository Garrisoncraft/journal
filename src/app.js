require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const entryRoutes = require('./routes/entryRoutes');

const app = express();
app.use(express.json());


// API versioning
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/entries', entryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({
        status: 500,
        error: err.message
    });

});

/*
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

*/


module.exports = app;
