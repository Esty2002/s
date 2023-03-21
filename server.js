require('dotenv').config()
const http = require('http')
const { app } = require('./app')
const { connect } = require('./services/db/mongo/mongo_connection')
const {sconnect} = require('./services/db/sql/sql_connection')
const { PORT, HOST } = process.env

connect().then(_ => {
    console.log('connect to mongo');
    app.listen(PORT, HOST, () => {
        console.log(`http://${HOST}:${PORT}`);
    })
})
// sconnect()

const server = http.createServer(app)
