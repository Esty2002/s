const sql = require('mssql')


let myconfig = {  
    server: 'TB1-100\\NEW_SQL',  //update me
    port:1433,
    user: 'javaLogin', //update me
    password: '1234',  //update me
    database: 'Products',
    options: {
        
      
       trustServerCertificate: true
          //update me
    }
};

let connection = null

const connect =async (config = myconfig)=>{
   connection =  await sql.connect(config)
  console.log({connection})
}

const disconnect  = ()=>{
    connection.close()
}

const getConnection =()=>connection

module.exports = {connect, disconnect, getConnection}