const express = require('express');
const app = express();

require('dotenv').config();
const cors = require('cors');


const swaggerLeads = require('./swagger/leads.json');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/products.json');
const pricelist_swagger=require('./services/swagger.json')
const manageUnitOfMeasure = require('./routers/products/unit_of_measure');
const pumps_router = require('./routers/products/pumps');
const manageAdditions = require('./routers/products/additions');
const manageBasicProducts = require('./routers/products/basicProducts');
const manageFinishProducts = require('./routers/products/finishProducts');
const branches_router = require('./routers/suppliers/branches');
const suppliers_router = require('./routers/suppliers/suppliers');
const delete_client_router = require('./routers/clients/deleteClients');
// const createClient_router = require('./routers/clients/createClient')
// const readClient_router = require('./routers/clients/readClient')
const updateClient_router = require('./routers/clients/updateClient')
const status_router = require('./routers/clients/status')
const auto_complete=require('./routers/utils/auto_complete')
const productsCombinations_router = require('./routers/products/productsCombinations')
const pricelist_router=require('./routers/price-list/pricelist')
const areas_router = require('./routers/areas/areas');
const {  reqLogger } = require('./services/logger/logger');

const api_router = require('./api/routers/readFile');
const router_leads=require('./routers/leads/leads')
const createClient_router = require('./routers/clients/createClient');
const readClient_router = require('./routers/clients/readClient');


const swaggerSuppliers = require('./swagger/suppliers.json');
const manage_branches_router = require('./routers/suppliers/branches');
const manage_suppliers_router = require('./routers/suppliers/suppliers');
// const delete_client_router = require('./routers/clients/deleteClient');
// const createClient_router=require('./routers/clients/createClient')
// const readClient_router=require('./routers/clients/readClient')
const readPriceList_router=require('./routers/pricelist/readPricelist')
const creatPricelist_router=require('./routers/pricelist/insertPricelist');

app.use(cors());

app.use('/pumps', pumps_router);
app.use('/unitOfMeasure', manageUnitOfMeasure);
app.use('/additions', manageAdditions);
app.use('/basicProducts', manageBasicProducts);
app.use('/finishProducts', manageFinishProducts);
app.use('/branches', branches_router);
app.use('/suppliers', suppliers_router);
app.use('/updateClient', updateClient_router)

app.use('/pricesNew', pricelist_router)
app.use('/api', api_router);
app.use('/readpricelist', readPriceList_router)

app.use('/creatPricelist',creatPricelist_router)
app.use('/productsCombinations', productsCombinations_router);




app.use('/leads', router_leads);
app.use('/areas', areas_router)
// app.use('/readClient', readClient_router);
// app.use('/areas', areas_router);
// app.use('/delete_client', delete_client_router);
// app.use('/readClient', readClient_router)



app.use('/updateClient', updateClient_router);

app.use('/areas', areas_router);
app.use('/pricesNew', pricelist_router);
app.use('/updateClient', updateClient_router);
app.use('/createClient', createClient_router);
app.use('/deleteclient', delete_client_router);
app.use('/readClient', readClient_router);
app.use('/statusesClient', status_router);
app.use('/auto_complete', auto_complete);
app.use('/productsCombinations', productsCombinations_router);

app.use('/api-pricelist-swagger', swaggerUi.serve, swaggerUi.setup(pricelist_swagger));
app.use('/api-swagger-suppliers', swaggerUi.serve, swaggerUi.setup(swaggerSuppliers));


app.get('/', (req, res) => {
    res.status(200).send('hello buyton');
});
app.get('/*', (req, res) => {
    res.status(200).send('request not found');
});

module.exports = { app };
