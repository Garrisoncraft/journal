require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

async function connect() {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, {});
    console.log('Connected to in-memory MongoDB');
}

async function disconnect() {
    await mongoose.disconnect();
    await mongoServer.stop();
}

async function clearDatabase() {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
}

async function createTestUser() {
    const User = require('../src/models/User');

        const testUser = new User({
            firstName: 'Test',
            lastName: 'User',
            email: 'testuser@example.com',
            password: 'password123'
        });
        await testUser.save();

    } 

async function setup() {
    await connect();
    await clearDatabase();
    await createTestUser();
}

module.exports = { connect, disconnect, clearDatabase, createTestUser, setup };
