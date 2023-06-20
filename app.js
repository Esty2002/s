require('dotenv').config()
const express = require('express');
const app = express();
const swaggerLeads = require('./swagger/leads.json');
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/products.json');

const manageUnitOfMeasure = require('./routers/products/unit_of_measure')
const pumps_router = require('./routers/products/pumps')
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
<<<<<<< HEAD
=======

const productsCombinations_router = require('./routers/products/productsCombinations')

const areas_router = require('./routers/areas/areas')

>>>>>>> 4eb9e009605059deeaaa278f5c41384256080aeb

app.use(cors());
app.use('/pumps', pumps_router)
app.use('/unitOfMeasure', manageUnitOfMeasure)
app.use('/additions', manageAdditions)
app.use('/basicProducts', manageBasicProducts)
app.use('/finishProducts', manageFinishProducts)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/swagger-leads', swaggerUi.serveFiles(swaggerLeads), swaggerUi.setup(swaggerLeads))

<<<<<<< HEAD
=======

>>>>>>> 4eb9e009605059deeaaa278f5c41384256080aeb
app.use('/branches', branches_router);
app.use('/suppliers', suppliers_router);
app.use('/updateClient', updateClient_router)
app.use('/createClient', createClient_router)
app.use('/deleteclient', delete_client_router);
app.use('/readClient', readClient_router)
app.use('/statusesClient', status_router)
app.use('/areas', areas_router)
// app.use('/api-swagger-suppliers', swaggerUi.serve, swaggerUi.setup(swaggerSuppliers));
<<<<<<< HEAD
=======
app.use('/productsCombinations', productsCombinations_router)
>>>>>>> 4eb9e009605059deeaaa278f5c41384256080aeb

app.get('/', (req, res) => {
    res.status(200).send('hello buyton');
});

app.get('/*', (req, res) => {
    res.status(200).send('request not found');
});

module.exports = { app }
