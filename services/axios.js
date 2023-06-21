require('dotenv');
const axios = require('axios');
const { SQL_SERVER_HOST, SQL_SERVER_PORT } = process.env

const sqlServer = axios.create({
    baseURL: `http://${SQL_SERVER_HOST}:${SQL_SERVER_PORT}`
})


const getData = async (server, url) => {
    console.log("getData");
    console.log(url,"url-getData");
    let response;
    // try {
        console.log("url:", url );
        response = await server.get(url);
        // console.log("response",response);
    // }

    // catch (error) {
    //     console.log("response-error");
    //     throw error;
    // }
    return response;
}

const postData=async(server,url,body)=>{
    let response;
    try {
        response = await server.post(url, body);
    }

    catch (error) {
        throw error;
    }
    return response;
}
module.exports = { sqlServer, getData, postData }