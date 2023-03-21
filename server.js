require('dotenv').config()
const { connect } = require('./services/db/mongo-connection');
const http = require('http')
const { app } = require('./app')
const { HOST, PORT } = process.env

connect().then(() => {
    app.listen(PORT, HOST, () => {
        console.log(`http://${HOST}:${PORT}`);
    })
})


const server = http.createServer(app)




