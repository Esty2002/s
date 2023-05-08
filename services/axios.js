require('dotenv');
const axios = require('axios');
const { SQL_SERVER_HOST, SQL_SERVER_PORT } = process.env

const sqlServer = axios.create({
    baseURL: `http://${SQL_SERVER_HOST}:${SQL_SERVER_PORT}`
})


const getData = async (server, url) => {
    let response;
    try {
        response = await server.get(url);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

const postData = async (server, url, body) => {
    let response;
    try {
        response = await server.post(url, body);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}
module.exports = { sqlServer, getData, postData }