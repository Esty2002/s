require('dotenv');
const axios = require('axios');
const { SQL_SERVER_HOST, SQL_SERVER_PORT } = process.env

const server = axios.create({
    baseURL: `http://${SQL_SERVER_HOST}:${SQL_SERVER_PORT}`
})


<<<<<<< HEAD
const getData = async (url) => {
    let response;
    try {
        console.log({url});
        response = await server.get(url);
        return response;
=======
const getData = async ( url) => {
    console.log("getData");
    let response;
    try {
        console.log("urlee", url);
        response = await sqlServer.get(url);
        console.log(response.data,'resssssssss');
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
    }
    catch (error) {
        throw error;
    }
}

<<<<<<< HEAD
const postData = async (url, body) => {

    try {
        let response = await server.post(url, body);
        return response;

    }
    catch (error) {
        return error;
=======
const postData = async ( url, body) => {
    let response;

    try {
        console.log('$4$');
        console.log(url,body,'ulul');

        response = await sqlServer.post(url, body);
        // console.log(response.data,'ospe');
    }
    catch (error) {
        // console.log(error.message,'mmmmmmmm');
        throw error;
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
    }
}
<<<<<<< HEAD
module.exports = { getData, postData }
// ----1
// url====== /read/distinct
// body====== { collection: 'areas', distinct: 'type' }
// ----2
// url====== /read/find
// body====== { collection: 'areas', filter: { type: 'poligon' } }
=======
module.exports = {  getData, postData }
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
