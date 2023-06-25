require('dotenv');
const axios = require('axios');
const { SQL_SERVER_HOST, SQL_SERVER_PORT } = process.env

const sqlServer = axios.create({
    baseURL: `http://${SQL_SERVER_HOST}:${SQL_SERVER_PORT}`
})


const getData = async ( url) => {
    console.log("getData");
    console.log(url,"url-getData");
    let response;
    try {
        response = await sqlServer.get(url);
    }

    catch (error) {
        console.log("response-error");
        throw error;
    }
    return response;
}

const postData=async(url,body)=>{
    let response;
    try {
        response = await sqlServer.post(url, body);
    }

    catch (error) {
        throw error;
    }
    return response;
}
module.exports = { sqlServer, getData, postData }