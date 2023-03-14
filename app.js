const express = require('express')


const express=require('express')
const app=express()
const cors = require('cors')

const delete_client_router = require('./routers/deleteClient');
const createClient_router=require('./routers/createClient')
app.use(cors())
app.use('/createClient', createClient_router)

app.get('/', async (req, res) => {
    console.log('Hello');
})

app.use('/delete', delete_client_router);

app.get('/', (req, res) => {
    console.log('init');
})



module.exports = { app }