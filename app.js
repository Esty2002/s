const express = require('express')
const app = express()
const cors=require('cors')
const manage_quotation=require('./routers/manageOuotation')

app.get('/',(req,res)=>{
   res.send({message:'welcome to main'})
})

app.use(cors())

app.use('/quotation',manage_quotation)

module.exports = { app }