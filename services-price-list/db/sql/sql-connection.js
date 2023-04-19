const sql = require('mssql')


let myconfig = {
    server: 'TB6-23\\MSSQLSERVER',  //update me 
    port: 1433,
    user: 'project', //update me
    password: '1234',  //update me
    database: 'Buyton',
    options: {


        trustServerCertificate: true
        //update me
    }
};

let connection = null

const connect = async (config = myconfig) => {
    connection = await sql.connect(config)
}

const disconnect = () => {
    connection.close()
}

const getConnection = () => connection

module.exports = { connect, disconnect, getConnection }