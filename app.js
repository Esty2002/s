require('dotenv').config()
const express = require('express');
const app = express();

const { connect } = require('./services/db/mongo-connection')

const router_leads = require('./routers/leads')

app.use('/leads', router_leads);

module.exports = { app }