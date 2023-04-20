require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')

const router_leads = require('./routers/leads/leads')
app.use(cors());
app.use('/leads', router_leads);
app.get('/', (req, res) => {
    res.status(200).send("hello to the server");
})



module.exports = { app }