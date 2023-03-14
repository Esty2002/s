const express=require('express')

const app=express()
const cors = require('cors')

const readClient_router=require('./routers/readClient')



app.use(cors())
app.use('/readClient', readClient_router)

app.get('/', async (req, res) => {
    console.log('Hellllo');
})


module.exports={app}