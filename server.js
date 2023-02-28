require('dotenv').config()

const http = require('http')
const { app } = require('./app')


const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3800


const { connect } = require('./services/db/mongo-connection')

const { HOST, PORT } = process.env;

connect()
    .then(
        app.listen(PORT, HOST, () => {
            console.log('connect to mongo');
            console.log(`http://${HOST}:${PORT}`);
        })
    )



const server = http.createServer(app)
