const express = require('express')


const app=express()
const cors = require('cors')

const delete_client_router = require('./routers/deleteClient');
const createClient_router=require('./routers/createClient')
const readClient_router=require('./routers/readClient')
const updateClient_router=require('./routers/updateClient')
app.use(cors())
app.use('/updateClient',updateClient_router)
app.use('/createClient', createClient_router)
app.use('/delete', delete_client_router);
app.use('/readClient', readClient_router)



app.get('/', async (req, res) => {
    console.log('Hellllo');
})

module.exports = { app }
