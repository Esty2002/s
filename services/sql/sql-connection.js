require('dotenv').config();
const sql=require('mssql')

const {SQL_SERVER,SQL_PORT,SQL_USERNAME,SQL_PASSWORD,SQL_DATABASE}=process.env;
let myconfig = {  
    server: "TB6-24\\MSSQLSERVER",  //update me
    port: SQL_PORT,
    user: SQL_USERNAME, //update me
    password: SQL_PASSWORD,  //update me
    database: SQL_DATABASE,
    options: {
        
      
       trustServerCertificate: true
          //update me
          
    }
};

let connection = null

const connect =async (config = myconfig)=>{
   connection =  await sql.connect(config)
}

const disconnect  = ()=>{
    connection.close()
}

const getConnection =()=>connection

module.exports = {connect, disconnect, getConnection,myconfig}