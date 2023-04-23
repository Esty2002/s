require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors());
const router_leads = require('./routers/leads/leads')
const router_areas = require('./routers/price-list/areas-router')
const router_prices = require('./routers/price-list/prices-router')
const communication_router=require('./routers/clients/communication')
const delete_client_router = require('./routers/clients/deleteClient');
const createClient_router=require('./routers/clients/createClient')
const readClient_router=require('./routers/clients/readClient')
const updateClient_router=require('./routers/clients/updateClient')
const status_router=require('./routers/clients/status')
const manage_branches_router = require('./routers/suppliers/branches');
const manage_suppliers_router = require('./routers/suppliers/suppliers');
const manage_quotation = require('./routers/quotation/manage-quotation');
const manageProduct = require('./routers/products/products')
const manageUnitOfMeasure = require('./routers/products/unit_of_measure')
const managePumps = require('./routers/products/pumps')


app.use('/leads', router_leads);
app.use('/areas', router_areas)
app.use('/prices', router_prices)
app.use('/communication',communication_router)
app.use('/updateClient',updateClient_router)
app.use('/createClient', createClient_router)
app.use('/delete_client', delete_client_router);
app.use('/readClient', readClient_router)
app.use('/statusesClient', status_router)
app.use('/branches',manage_branches_router);
app.use('/suppliers',manage_suppliers_router);
app.use('/quotation', manage_quotation);
app.use('/product', manageProduct)
app.use('/unit_of_measure', manageUnitOfMeasure)
app.use('/pumps', managePumps)

app.get('/', async (req, res) => {
   res.status(200).send({message:'our api'})
})








app.get('/*', (req, res) => {
    res.status(404).send('not found')
})
module.exports = { app }

