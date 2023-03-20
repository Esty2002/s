require('dotenv').config()
const http = require('http')
const { app } = require('./app')
const { connect } = require('./services/db/mongo/mongo_connection')
const { sconnect } = require('./services/db/sql/sql_connection')
const { MongoDBOperations }=require('./services/db/mongo/mongo-operation')
const { PORT, HOST } = process.env

connect().then(_ => {

    console.log('connect to mongo');
    app.listen(PORT, HOST, () => {
        console.log(`http://${HOST}:${PORT}`);
    })
})


const r=new MongoDBOperations()
const a=r.insertOne({ordinalNumber:1,traitName:'ss',must:true,shortTrait:'1'
,values:[{name:'stam',addedDate:"28/03/03"}],addedDate:"12/03/23",enabled:true})
   
console.log("aaaaaaaaaaaa",a);
    
    

sconnect().then(_=>{
    console.log('connect to sql');
    console.log("stam");
})

const server = http.createServer(app)
