const request = require('supertest');
const { app } = require('../../../app')


// const { app } = require('../../../modules/areas/areas')



// const { insert} = require('../../modules/pricelist/insertPricelist')
jest.mock('../../../modules/areas/areas', () => {
    return {
        insertArea: jest.fn((obj) => {
            console.log({ obj })
            
        })
    }
})