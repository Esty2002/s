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
    console.log(response,"response");
    return response;
}

const postData = async (url, body) => {
    let response;
    try {
        console.log('url======',url);
        console.log('body======',body);
        response = await server.post(url, body);
    }
    catch (error) {
        return error;
    }
    return response;
}
module.exports = {  getData, postData }
// ----1
// url====== /read/distinct
// body====== { collection: 'areas', distinct: 'type' }
// ----2
// url====== /read/find
// body====== { collection: 'areas', filter: { type: 'poligon' } }