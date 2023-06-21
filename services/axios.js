require('dotenv');
const axios = require('axios');
const { SQL_SERVER_HOST, SQL_SERVER_PORT } = process.env

const server = axios.create({
    baseURL: `http://${SQL_SERVER_HOST}:${SQL_SERVER_PORT}`
})


const getData = async (url) => {
    let response;
    try {
        response = await server.get(url);
        console.log(response.data,"response");
    }

    catch (error) {
        throw error;
    }
    // console.log(response,"response");
    return response;
}

const postData = async (url, body) => {

    let response;
    try {
        response = await server.post(url, body);
    }
    catch (error) {
        return error;
    }
    return response;
}
module.exports = {  getData, postData }