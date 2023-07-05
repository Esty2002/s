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
        return response;
    }
    catch (error) {
        console.log({ error: error.message })
        throw error;
    }
    
}

const postData = async (url, body) => {
    let response;
    try {
        console.log({ url, body: JSON.stringify(body) })
        response = await server.post(url, body);
        console.log({ response: response.data })
        return response;
    }
    catch (error) {
        console.log({ error: error.message })
        throw error;
    }
}
module.exports = { getData, postData }
// ----1
// url====== /read/distinct
// body====== { collection: 'areas', distinct: 'type' }
// ----2
// url====== /read/find
// body====== { collection: 'areas', filter: { type: 'poligon' } }