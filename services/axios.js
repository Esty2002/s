require('dotenv');
const axios = require('axios');
const { SQL_SERVER_HOST, SQL_SERVER_PORT } = process.env

const sqlServer = axios.create({
    baseURL: `http://${SQL_SERVER_HOST}:${SQL_SERVER_PORT}`
})


const getData = async ( url) => {
    console.log("getData");
    let response;
    try {
        console.log("urlee", url);
        response = await sqlServer.get(url);
        console.log(response.data,'resssssssss');
    }

    catch (error) {
        console.log("response-error");
        throw error;
    }
    return response;
}

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
    }
    return response;
}
module.exports = {  getData, postData }