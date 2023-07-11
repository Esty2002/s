require('dotenv');
const axios = require('axios');
const { SQL_SERVER_HOST, SQL_SERVER_PORT } = process.env

const server = axios.create({
    baseURL: `http://${SQL_SERVER_HOST}:${SQL_SERVER_PORT}`
})


const getData = async (url) => {
    let response;
    // console.log({url});
    try {
        response = await server.get(url);
        console.log(response.data,"response");
        return response;
    }
    catch (error) {
        console.log({error:error.message})
        throw error;
    }
}

const postData=async(url,body)=>{
    let response;
    try {
        response = await server.post(url, body);
        console.log({response:response.data})
        return response;
    }
    catch (error) {
        console.log({error:error.message})
        return error;
    }
}
module.exports = {  getData, postData }
