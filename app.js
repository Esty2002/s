require('dotenv').config()
const express = require('express');
const app = express();
const swaggerLeads = require('./swagger/leads.json');
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/products.json');

const manageUnitOfMeasure = require('./routers/products/unit_of_measure')
const managePumps = require('./routers/products/pumps')
const manageAdditions = require('./routers/products/additions')
const manageBasicProducts = require('./routers/products/basicProducts')
const manageFinishProducts = require('./routers/products/finishProducts')
const branches_router = require('./routers/suppliers/branches');
const suppliers_router = require('./routers/suppliers/suppliers');
const delete_client_router = require('./routers/clients/deleteClients');
const createClient_router = require('./routers/clients/createClient')
const readClient_router = require('./routers/clients/readClient')
const updateClient_router = require('./routers/clients/updateClient')
const status_router = require('./routers/clients/status')
const router_leads=require('./routers/leads/leads')

app.use(cors());
app.use('/pumps', managePumps)
app.use('/unitOfMeasure', manageUnitOfMeasure)
app.use('/additions', manageAdditions)
app.use('/basicProducts', manageBasicProducts)
app.use('/finishProducts', manageFinishProducts)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/swagger-leads', swaggerUi.serveFiles(swaggerLeads), swaggerUi.setup(swaggerLeads))

app.use('/branches', branches_router);
app.use('/suppliers', suppliers_router);
app.use('/updateClient', updateClient_router)
app.use('/createClient', createClient_router)
app.use('/delete_client', delete_client_router);
app.use('/readClient', readClient_router);
app.use('/statusesClient', status_router);
app.use('/leads',router_leads);
// app.use('/api-swagger-suppliers', swaggerUi.serve, swaggerUi.setup(swaggerSuppliers));


app.get('/', (req, res) => {
    res.status(200).send('hello buyton');
});

app.get('/*', (req, res) => {
    res.status(200).send('request not found');
});

module.exports = { app }
