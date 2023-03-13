require('dotenv').config()
const express = require('express');
const app = express();

const { connect } = require('./services/db/mongo-connection')

const router_leads = require('./routers/leads')
app.get('/',(req,res)=>{
    res.status(200).send("hello to the server");
})
app.use('/leads', router_leads);

module.exports = { app }