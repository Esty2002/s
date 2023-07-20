require('dotenv').config()
const http = require('http')
const { app } = require('./app')

const { HOST, PORT } = process.env;

app.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}`);
})

const server = http.createServer(app);


// console.log({ obj });
//     const result = await postData('/create/insertone',
//         {
//             collection: "areas",
//             data: obj
//         });
//     console.log('mongo----', result.data, 'name', obj.name);
//     if (result.data) {
//         const resultToSql = await postData('/create/create',
//             {
//                 tableName: "tbl_Areas",
//                 values: { AreaIdFromMongo: result.data, AreaName: obj.name }
//             })
//         //-------------------------------------- לשאול את המורה איזו שאלה הכי נחוצה
//         console.log("resultToSql-------------", resultToSql);
//         console.log("resultToSql.rowsAffected", resultToSql.data.rowsAffected);
//         console.log("resultToSql.data", resultToSql.data);
//         if (resultToSql && resultToSql.status === 201 && resultToSql.data.rowsAffected != undefined && resultToSql.data.rowsAffected[0] > 0) {
//             // console.log("resultToSql-------------", resultToSql);
//             // console.log("resultToSql.rowsAffected", resultToSql.data.rowsAffected);
//             // console.log("resultToSql.data", resultToSql.data);
//             return resultToSql.data;
//         }
//         else {
//             throw new Error("Can't insert area to mongo and sql DB");
//         }
//     }
//     else {
//         throw new Error("Can't insert area");
//     }
