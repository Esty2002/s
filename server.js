require('dotenv').config();
const { createTables,createProcedure } = require('./services-receipt/sql/sql-init');
const http = require('http');

const { app } = require('./app');

const { HOST, PORT } = process.env;

createTables().then(createProcedure().then(_ => {
    app.listen(PORT, HOST, () => {
        console.log(`http://${HOST}:${PORT}`);
    });
}))

const server = http.createServer(app);
