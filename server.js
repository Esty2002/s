require('dotenv').config()

const http=require('http')
const {connect} =require('./dal/db/mongo/mongo-connections')
const {connectToSql}=require('./dal/db/sql/sql-wrapper')
const {app}=require('./app')

const {HOST,PORT}=process.env

connect().then(connectToSql()).then(_=>{
    console.log('mongo and sql is connected');

    app.listen(PORT,HOST,()=>{
        console.log(`http://${HOST}:${PORT}`);
    })
})

const server=http.createServer(app)