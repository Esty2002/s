const express=require('express')

const app=express()
const cors=require('cors')
app.use(cors())
const updateClient_router=require('./routers/updateClient')
app.use('/updateClient',updateClient_router)


app.get('/',(req,res)=>{
    console.log('i connect');
})
module.exports={app}