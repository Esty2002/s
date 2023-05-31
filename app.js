require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/products.json');

const manageUnitOfMeasure = require('./routers/products/unit_of_measure')
const managePumps = require('./routers/products/pumps')
const manageAdditions = require('./routers/products/additions')
const manageBasicProducts = require('./routers/products/basicProducts')
const manageFinishProducts = require('./routers/products/finishProducts')

app.use(cors());
app.use('/pumps', managePumps)
app.use('/unitOfMeasure', manageUnitOfMeasure)
app.use('/additions', manageAdditions)
app.use('/basicProducts', manageBasicProducts)
app.use('/finishProducts', manageFinishProducts)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.status(200).send('hello buyton');
});

app.get('/*', (req, res) => {
    res.status(200).send('request not found');
});

module.exports = { app }
