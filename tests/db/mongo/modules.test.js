const{response}=require('express')
const request=require('supertest')

const{app}=require('../app')

let server

beforeAll(()=>{
    server=app.listen(2222)
})

describe('GET API',()=>{
    it('return ',async()=>{
        
    })
})