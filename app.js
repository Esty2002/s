const express = require('express');
const app = express();
const cors = require('cors');

const create_router = require('./routers/receipt/create');
const read_router = require('./routers/receipt/read');
const update_router = require('./routers/receipt/update');
const delete_router = require('./routers/receipt/delete');

app.use(cors());

app.use('/create', create_router);
app.use('/read', read_router);
app.use('/update', update_router);
app.use('/delete', delete_router);

app.get('/', (req, res) => {
    res.status(200).send('hello buyton');
});

app.get('/*', (req, res) => {
    res.status(200).send('request not found');
});

module.exports = { app };
