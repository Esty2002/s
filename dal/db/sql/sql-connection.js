const sql=require ('mssql')
let myconfig={
    server:'TB1-20\\NEW_SQL',
    port:1433,
    user:'project',
    password:'1234',
    database:'Buyton',
    options:{
        trustServerCertificate:true
    }
};

let connection=null;
const connect=async (config=myconfig)=>{
    console.log('in connect'); 
    connection=await sql.connect(config)
    console.log('after connect');
};

const disconnect=()=>{
    connection.close();
}

const getConnection=()=>connection

module.exports={connect,disconnect,getConnection}