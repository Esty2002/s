require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/products.json');

// const manageProduct = require('./routers/products/products')
// const manageUnitOfMeasure = require('./routers/products/unit_of_measure')
// const managePumps = require('./routers/products/pumps')
app.use(cors());
// app.use('/product', manageProduct)
// app.use('/pumps', managePumps)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('/', (req, res) => {
    res.status(200).send('hello buyton');
});

app.get('/*', (req, res) => {
    res.status(200).send('request not found');
});

module.exports = { app }
