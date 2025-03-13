const request = require('supertest');
const app = require('../src/app');
const { connect, disconnect, clearDatabase, createTestUser } = require('./testsetup');

beforeAll(async () => {
    jest .setTimeout(30000);
    await connect(); // Connect to the in-memory database
});

afterAll(async () => {
    await disconnect(); // Disconnect from the in-memory database
}, 30000);

beforeEach(async () => {
    await clearDatabase(); // Clear the database before each test
    await createTestUser(); // Create a test user
});

let usertoken;
let entryId;

describe('Entry API', () => {
    beforeEach(async () => {
        // Login before each test
        const loginRes = await request(app)
            .post('/api/v1/auth/signin')
            .send({ email: 'testuser@example.com', 
                    password: 'password123' });
                    usertoken = loginRes.body.data.token;

        // Create a new entry before each test
        const createRes = await request(app)
            .post('/api/v1/entries')
            .set('Authorization', usertoken)
            .send({ title: 'Test Entry', 
                    description: 'Test description' });
        entryId = createRes.body.data._id;
    }, 30000);

    it('should create a new entry', async () => {
        const res = await request(app)
            .post('/api/v1/entries')
            .set('Authorization',`${usertoken}`)
            .send({
                title: 'My First Entry',
                description: 'This is the content of my first entry.'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
        entryId = res.body.data.id; // Store the entry ID for later tests
    }, 30000);

    it('should get all entries', async () => {
        const res = await request(app)
            .get('/api/v1/entries')
            .set('Authorization',`${usertoken}`)
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
    }, 30000);

    it('should get a specific entry', async () => {
        const res = await request(app)
            .get(`/api/v1/entries/${entryId}`)
            .set('Authorization',`${usertoken}`)
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
    }, 30000);

    it('should update an entry', async () => {
        const res = await request(app)
            .patch(`/api/v1/entries/${entryId}`)
            .set('Authorization',`${usertoken}`)
            .send({
                title: 'Updated Entry Title',
                description: 'Updated description.'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
    }, 30000);

    it('should delete an entry', async () => {
        const res = await request(app)
            .delete(`/api/v1/entries/${entryId}`)
            .set('Authorization',`${usertoken}`)
        expect(res.statusCode).toEqual(204);
    }, 30000);
});