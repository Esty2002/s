require('dotenv').config();
const http = require('http');
const { app } = require('./app');
const { connect } = require('./services/sql/sql-connection')

const { HOST, PORT } = process.env;

connect().then(_ => {
    console.log('connect to sql');
    app.listen(PORT, HOST, () => {
        console.log(`http://${HOST}:${PORT}`);
    })
})

const server = http.createServer(app);

