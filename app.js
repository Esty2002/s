require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors());
const router_leads = require('./routers/leads/leads')
const router_areas = require('./routers/price-list/areas-router')
const router_prices = require('./routers/price-list/prices-router')


app.use('/leads', router_leads);
app.use('/areas', router_areas)
app.use('/prices', router_prices)
app.get('/', (req, res) => {
    res.status(200).send("hello to the server");
})
module.exports={app}