require('dotenv');
const axios = require('axios');
const { SQL_SERVER_HOST, SQL_SERVER_PORT } = process.env

const server = axios.create({
    baseURL: `http://${SQL_SERVER_HOST}:${SQL_SERVER_PORT}`
})


const getData = async (url, query) => {
    let response;
    // console.log({url});
    try {
        response = await server.get(url);
    }
    catch (error) {
        throw error;
    }
    // console.log(response.data,"response");
    return response;
}

const postData=async(url,body)=>{
    let response;
    try {
        response = await server.post(url, body);
        return response;
    }
    catch (error) {
        console.log({ error: error.message })
        throw error;
    }
}

const putData = async (url, body) => {
    let response;
    try {
        console.log({ url, body: JSON.stringify(body) })
        response = await server.put(url, body);
        return response
    }
    catch (error) {
        console.log({ error: error.message })
        throw error;
    }
}

const deleteData = async (url, body) => {
    let response;
    try {
        console.log({ url, body: JSON.stringify(body) })
        response = await server.delete(url, {data:body});
        return response
    }
    catch (error) {
        console.log({ error: error.message })
        throw error;
    }
}
module.exports = { getData, postData, putData , deleteData}

