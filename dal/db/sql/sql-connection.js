const sql=require ('mssql')
let myconfig={
    server:'TB1-03\\NEW_SQL',
    port:1433,
    user:'project',
    password:'1234',
    database:'BuytonPnini',
    options:{
        trustServerCertificate:true
    }
};
let connection=null;
const connect=async (config=myconfig)=>{
    connection=await sql.connect(config);
    //console.log({connection});
};

const disconnect=()=>{
    connection.close();
}

const getConnection=()=>connection

module.exports={connect,disconnect,getConnection}