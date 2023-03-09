const http = require('http')
const { app } = require('./app')

const { connect } = require('./services/db/mongo-connection')

const host = '127.0.0.1'
const port = 5000

connect().then(_ => {
    console.log('connect to mongo');
    app.listen(port, host, () => {
        console.log(`http://${host}:${port}`);
    })
})

const server = http.createServer(app)