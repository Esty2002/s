const express = require('express');
const app = express();

const create_router = require('./routers/create');
const read_router = require('./routers/read');
const update_router = require('./routers/update');
const delete_router = require('./routers/delete');

app.use('/create', create_router);
app.use('/read', read_router);
app.use('/update', update_router);
app.use('/delete', delete_router);

module.exports = { app };
