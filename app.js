require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')

const swaggerUi = require('swagger-ui-express');
const pricelist_swagger=require('./services/swagger.json')
// const swaggerSuppliers = require('./swagger/supplier.json');
const manage_branches_router = require('./routers/suppliers/branches');
const manage_suppliers_router = require('./routers/suppliers/suppliers');
// const delete_client_router = require('./routers/clients/deleteClient');
const createClient_router=require('./routers/clients/createClient')
const readClient_router=require('./routers/clients/readClient')
const updateClient_router=require('./routers/clients/updateClient')
const status_router=require('./routers/clients/status')
const creatPricelist_router=require('./routers/pricelist/insertPricelist')

app.use(cors());


app.use('/branches',manage_branches_router);
app.use('/suppliers',manage_suppliers_router);
app.use('/updateClient',updateClient_router)
app.use('/createClient', createClient_router)
// app.use('/delete_client', delete_client_router);
app.use('/readClient', readClient_router)
app.use('/statusesClient', status_router)
app.use('/creatPricelist',creatPricelist_router)

app.use('/api-pricelist-swagger', swaggerUi.serve, swaggerUi.setup(pricelist_swagger));


app.get('/', (req, res) => {
    res.status(200).send('hello buyton');
});

app.get('/*', (req, res) => {
    res.status(200).send('request not found');
});

module.exports = { app };
