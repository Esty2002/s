const express=require('express')
const communication_router=require('./routers/communication')
const app=express()
const cors=require('cors')

app.use(cors())
app.use('/communication',communication_router)





module.exports={app}