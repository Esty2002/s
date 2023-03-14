const express=require('express')
const app=express()
const cors = require('cors')

const createClient_router=require('./routers/createClient')
app.use(cors())
app.use('/createClient', createClient_router)

app.get('/', async (req, res) => {
    console.log('Hello');
})

module.exports={app}