const request = require('supertest');
const app = require('../src/app');
const { connect, disconnect, clearDatabase } = require('./testsetup');


let usertoken;

beforeAll(async () => {
    jest .setTimeout(30000);
    await connect(); // Connect to the in-memory database
});

afterAll(async () => {
    await disconnect(); // Disconnect from the in-memory database
}, 30000);

beforeEach(async () => {
    await clearDatabase(); // Clear the database before each test
});

describe('User API', () => {
 

    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/v1/auth/signup')
            .send({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('token'); // Ensure token is returned
        usertoken = res.body.data.token;
    }, 30000);

    it('should login a user', async () => {
        // Create a user first
        await request(app)
            .post('/api/v1/auth/signup')
            .send({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: 'password123'
            });

        // Attempt to log in
        const res = await request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'john.doe@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('token'); // Ensure token is returned
        usertoken = res.body.data.token;
    }, 30000);
});