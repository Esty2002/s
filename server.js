require('dotenv').config()
const http = require('http')
const { app } = require('./app')

const { HOST, PORT } = process.env;

// const { connectToSql } = require('./services-clients/sql/sql-wrapper')
const { connect } = require('./services-leads/db/mongodb/mongo-connection')
// const { connect1 } = require('./services-price-list/db/mongo/mongo-connection')
// const { connectToSqlSuppliers } = require('./services-suppliers/db/sql-wrapper');
// const { connectQuotation } = require('./services-quotation/sql/sql-connection');


// connect().then(connect1().then(connectToSql().then(connectToSqlSuppliers().then(connectQuotation().then(
//     app.listen(PORT, HOST, () => {
//         console.log('connect to mongo');
//         console.log(`http://${HOST}:${PORT}`);
//     })
// )
// ))))
//            בעיות
//               מסכים רק מספרים#
// התאריך לא נכתב בצורה נורמלית#




// const server = http.createServer(app);
// const { connect } = require('./services-products/db/mongo/mongo_connection')
// const { PORT, HOST } = process.env

connect().then(_ => {

    console.log('connect to mongo');
    app.listen(PORT, HOST, () => {
        console.log(`http://${HOST}:${PORT}`);
    })
})
// sconnect()
const server = http.createServer(app)
