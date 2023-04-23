require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const manage_quotation = require('./routers/quotation/manage-quotation');

app.use(cors());
app.use('/quotation', manage_quotation);

app.get('/', async (req, res) => {
    res.send('hello project');
});


module.exports = { app };
