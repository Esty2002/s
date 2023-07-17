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
        return response;
    }
    catch (error) {
        throw error;
    }
}

const postData = async (url, body) => {
    let response;
    try {
        response = await server.post(url, body);
        return response;
    }
    catch (error) {
        throw error;
    }
}
module.exports = { getData, postData }
