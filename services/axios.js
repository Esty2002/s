require('dotenv');
const axios = require('axios');
const { SQL_SERVER_HOST, SQL_SERVER_PORT } = process.env

const server = axios.create({
    baseURL: `http://${SQL_SERVER_HOST}:${SQL_SERVER_PORT}`
})

const getData = async (url, query) => {
    let response;
    let condition = '';
    if (query) {
        condition = convertCondition(query)
    }
    try {
        response = await server.get(url + condition);
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
function convertCondition() {
    // let obj = {AND:[{ClientCode:885417},{City:'אשדוד'}],OR:[{Ovligo:4},{ZipCode:77452}]}
    //{ AND: [{ Ovligo: 4 }, { OR: [{ City: אשדוד }, { City: בני-ברק }] }], OR: [{ ZipCode: 77452 }, { ZipCode: 74522 }] }
    // /read/readAll?start=AND&Ovligo=4&start=OR&City=אשדוד&City=בני-ברק&end=OR&end=AND&start=OR&ZipCode=77452&ZipCode=74522&end=OR
    let obj = { AND: [{ Ovligo: 4 }, { OR: [{ City: 'אשדוד' }, { City: 'בני-ברק' }] }], OR: [{ ZipCode: 77452 }, { ZipCode: 74522 }] }
    let str = '?'
    let i = 0;
    const getArgumentsStr = (arg, str) => {

        if (arg && arg.length == undefined) { //arg is object
            if (Object.keys(arg).length == 1 && typeof (arg[Object.keys(arg)[0]]) != 'object') { // arg is simple object
                let objKey = Object.keys(arg)[0]
                i++;
                return str + `${objKey}${i}=${arg[objKey]}&`
            }
            Object.keys(arg).map(a => {
                str += `start${i}=${a}&`
                i++;
                str = getArgumentsStr(arg[a], str)
                str += `end${i}=${a}&`
                i++;

            })
        }
        else { //arg is array
            arg.forEach(element => {
                str = getArgumentsStr(element, str)
            });
        }
        return str
    }
    str = getArgumentsStr(obj, str);
    str = str.substring(0, str.length - 1)
    console.log(str, "\n----------------------------------------------------------------------------------");
    return str;
}
module.exports = { getData, postData }
    // ----1
    // url====== /read/distinct
    // body====== { collection: 'areas', distinct: 'type' }
    // ----2
    // url====== /read/find
    // body====== { collection: 'areas', filter: { type: 'poligon' } }