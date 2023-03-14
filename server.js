require('dotenv').config()

const http=require('http')

const {connect} =require('./dal/db/mongo/mongo-connections')

const {app}=require('./app')

const {HOST,PORT}=process.env

connect().then(_=>{
    app.listen(PORT,HOST,()=>{
        console.log(`http://${HOST}:${PORT}`);
    })
})

const server=http.createServer(app)