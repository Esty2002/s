require('dotenv').config();
const http = require('http');
const { app } = require('./app');
const { connect } = require('./services/db/sql/sql-connection');

const { HOST, PORT } = process.env;

connect().then(_ => {
    console.log('connect to sql');
    app.listen(PORT, HOST, () => {
        console.log(`http://${HOST}:${PORT}`);
    })
})


const server = http.createServer(app);





// {
//     "table": "quotationItems",
//     "quotationCode": 111722,
//     "rowNumber": 5,
//     "itemCode": 5,
//     "priceList": 9,
//     "amount": 8,
//     "price": 3,
//     "discount": 4,
//     "priceAfterDiscount": 2,
//     "priceChange": 2,
//     "total": 87,
//     "addedDate": "1994-03-17 00:00:00.000",
//     "disabled": 0,
//     "disabledDate": "1994-04-11 00:00:00.000"
// }

// UPDATE Students
// SET FirstName ='ללי'
// where id=765465746


// INSERT INTO Students
//  VALUES ('222222222','REEEEEEEEEEE','מרון','האתרוג 44',4,'34343','08-8111111','052-1111111','1994-04-11 00:00:00.000',NULL,NULL)

// {
//     "quotationCode": 33333,
//     "rowNumber": 6,
//     "arr": [
//         {
//             "field": "total",
//             "value": 2
//         },
//         {
//             "field": "price",
//             "value": 2
//         },
//            {
//             "field": "amount",
//             "value": 2
//         }
//     ]
// }

// serialNumber int IDENTITY(1000,1) NOT NULL,
// 




// {
//     "table": "quotationItems",
//     "lead": "true",
//     "code": 1025
// }