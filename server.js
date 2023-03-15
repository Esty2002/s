require('dotenv').config();
const http = require('http');
const { connect } = require('./services/db/mongo-connection');
const { app } = require('./app')

const HOST = process.env || '127.0.0.1'
const PORT = process.env || 2222
connect().then(() => {
    app.listen(PORT, HOST, () => {
        console.log('server is open at http://localhost:2222');
    })
})


const server = http.createServer(app)




