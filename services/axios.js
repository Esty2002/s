require('dotenv');
const axios = require('axios');
const { SQL_SERVER_HOST, SQL_SERVER_PORT } = process.env

const sqlServer = axios.create({
    baseURL: `http://${SQL_SERVER_HOST}:${SQL_SERVER_PORT}`
})


const getData = async ( url) => {
    let response;
    try {
        response = await sqlServer.get(url);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

const postData = async ( url, body) => {
    console.log(";;;;;;;;;;;;;;;;;;;;;;y");
    let response;
    try {
        console.log("p,jkjhk:::::::::::::::::::::::");
        response = await sqlServer.post(url, body);
        console.log("p,eeeeeeeeeeeeeeeeeeeee:::::::::::::::::::::::");

        return response.data;
    }
    catch (error) {
        throw error;
    }
}
module.exports = {  getData, postData }