require('dotenv').config()
const http = require('http')

const { app } = require('./app')
const { createTables } = require('./services/sql-operation')


const host = process.env.HOST || "localhost"
const port = process.env.PORT


createTables().then(_ => {

    app.listen(port, host, () => {
        console.log(`http://${host}:${port}`)
    })
})


const server = http.createServer(app)

