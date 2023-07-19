require('dotenv');
const axios = require('axios');
const { SQL_SERVER_HOST, SQL_SERVER_PORT } = process.env

const server = axios.create({
    baseURL: `http://${SQL_SERVER_HOST}:${SQL_SERVER_PORT}`
})


const getData = async (url, query) => {
    let response;

    // console.log({ url });

    console.log({ url });

    if (query) {
        url += Object.entries(query).reduce((q, i) => q = q == '?' ? `${q}${i[0]}=${i[1]}` : `${q}&${i[0]}=${i[1]}`, '?')
    }
    console.log({url})

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
        return response
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
// ----1
// url====== /read/distinct
// body====== { collection: 'areas', distinct: 'type' }
// ----2
// url====== /read/find
// body====== { collection: 'areas', filter: { type: 'poligon' } }