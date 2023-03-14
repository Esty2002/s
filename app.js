const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const manage_branches_router = require('./routers/branches');
const manage_suppliers_router = require('./routers/suppliers');

app.use('/branches',manage_branches_router);
app.use('/suppliers',manage_suppliers_router);

app.get('/',(req,res)=>{
    res.send('hello');
})

module.exports = { app };
