require('dotenv');
const axios = require('axios');
const { SQL_SERVER_HOST, SQL_SERVER_PORT } = process.env

const server = axios.create({
    baseURL: `http://${SQL_SERVER_HOST}:${SQL_SERVER_PORT}`
})


<<<<<<< HEAD
const getData = async (server, url) => {
=======
const getData = async (url) => {
>>>>>>> 4eb9e009605059deeaaa278f5c41384256080aeb
    let response;
    try {
        response = await server.get(url);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

const postData = async (url, body) => {

    let response;
    try {
        response = await server.post(url, body);
        return response.data;
    }
    catch (error) {
        return error;
    }
}
module.exports = {  getData, postData }