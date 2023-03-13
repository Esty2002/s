
require('dotenv').config();
const http = require('http');

const { app } = require('./app');
const { connectToSql } = require('./db/sql-wrapper');


const host = process.env.HOST || "localhost"
const port = process.env.PORT


connectToSql().then(_ => {
    app.listen(port, host, () => {
        console.log(`http://${host}:${port}`)
    })
})


const server = http.createServer(app)

