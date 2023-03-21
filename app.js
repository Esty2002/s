const express = require('express')
const app = express()
const manage_quotation=require('./routers/manageQuotation')


app.get('/', (req, res) => {
    res.send({ message: 'welcome to main' })
})



app.use('/quotation',manage_quotation)


module.exports = { app }