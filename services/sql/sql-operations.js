require('dotenv').config()
const { getConnection, connect, disconnect } = require('./sql-connection');
const { SQL_SERVER, SQL_DBNAME, SQL_USERNAME, SQL_PASSWORD ,SQL_PORT} = process.env;