require('dotenv').config()
const http = require('http')
const { app } = require('./app')

const { HOST, PORT } = process.env;

const { connectToSql } = require('./services-clients/sql/sql-wrapper')
const { connect } = require('./services-leads/db/mongodb/mongo-connection')
const { connect1 } = require('./services-price-list/db/mongo/mongo-connection')


connect().then(connect1().then(connectToSql().then(
    app.listen(PORT, HOST, () => {
        console.log('connect to mongo');
        console.log(`http://${HOST}:${PORT}`);
    })
)
))








const server = http.createServer(app)
