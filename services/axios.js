require('dotenv');
const axios = require('axios');
const { SQL_SERVER_HOST, SQL_SERVER_PORT } = process.env

const server = axios.create({
    baseURL: `http://${SQL_SERVER_HOST}:${SQL_SERVER_PORT}`
})


const getData = async (url) => {
    let response;
    console.log({url});
    try {
        response = await server.get(url);
        // console.log(response.data,"response");
    }
    catch (error) {
        throw error;
    }
    console.log(response.data,"response");
    return response.data;
}

const postData = async (url, body) => {
    let response;
    try {
        console.log("p,jkjhk:::::::::::::::::::::::ggggggggggggggggggggggggggggggggggggggggggg7777777777777",url);
        response = await server.post(url, body);
        console.log("p,eeeeeeeeeeeeeeeeeeeee:::::::::::::::::::::::");

        return response.data;
    }
    catch (error) {
        return error;
    }
}
module.exports = {  getData, postData }
// ----1
// url====== /read/distinct
// body====== { collection: 'areas', distinct: 'type' }
// ----2
// url====== /read/find
// body====== { collection: 'areas', filter: { type: 'poligon' } }
