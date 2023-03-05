const express=require('express')

const app=express()

const readClient_router=require('./routers/readClient')



app.use('/readClient', readClient_router)


module.exports={app}