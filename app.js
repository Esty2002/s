const express = require('express');
const app = express();
const cors = require('cors')

const create_router = require('./routers/create');
const read_router = require('./routers/read');
const update_router = require('./routers/update');
const delete_router = require('./routers/delete');

app.use(cors())

app.use('/create', create_router);
app.use('/read', read_router);
app.use('/update', update_router);
app.use('/delete', delete_router);

app.get('/', (req, res)=>{
    res.status(200).send('hello app')
})

app.get('/*', (req, res)=>{
    res.status(200).send('req not found')
})
module.exports = { app };
