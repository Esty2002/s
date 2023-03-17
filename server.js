const http = require('http')
const { app } = require('./app')

const { connect } = require('./services/db/mongo-connection')

const HOST =process.env|| '127.0.0.1'
const PORT =process.env || 5000

connect().then(_ => {
    console.log('connect to mongo');
    app.listen(HOST, PORT, () => {
        console.log(`http://${HOST}:${PORT}`);
    })
})

const server = http.createServer(app)