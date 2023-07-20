const request = require('supertest');
const { app } = require('../../../app');

jest.mock('../../../modules/areas/areas', () => {
    return {
        insertArea: jest.fn((obj) => {
            
        }),
    }
});