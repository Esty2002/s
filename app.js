
const express=require('express')
const app=express()
const cors=require('cors')

const communication_router=require('./routers/clients/communication')
const delete_client_router = require('./routers/clients/deleteClient');
const createClient_router=require('./routers/clients/createClient')
const readClient_router=require('./routers/clients/readClient')
const updateClient_router=require('./routers/clients/updateClient')
const status_router=require('./routers/clients/status')

app.use(cors())

app.use('/communication',communication_router)
app.use('/updateClient',updateClient_router)
app.use('/createClient', createClient_router)
app.use('/delete', delete_client_router);
app.use('/readClient', readClient_router)
app.use('/statuses', status_router)

app.get('/', async (req, res) => {
   res.status(200).send({message:'our api'})
})

module.exports = { app }
