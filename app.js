const express = require('express')

const app = express()

const cors=require('cors')
app.use(cors())

const delete_client_router = require('./routers/deleteClient');

app.use('/delete', delete_client_router);

app.get('/', (req, res) => {
    console.log('init');
})



module.exports = { app }