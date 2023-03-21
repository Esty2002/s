require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const { connect } = require('./services/db/mongo-connection')

const router_leads = require('./routers/leads')
app.use(cors());
app.use('/leads', router_leads);
app.get('/', (req, res) => {
    res.status(200).send("hello to the server");
})



module.exports = { app }