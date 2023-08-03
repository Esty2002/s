require('dotenv');
const axios = require('axios');
const { SQL_SERVER_HOST, SQL_SERVER_PORT } = process.env

const server = axios.create({
    baseURL: `http://${SQL_SERVER_HOST}:${SQL_SERVER_PORT}`
})


const getData = async (url, query) => {
    console.log("condition");
    console.log(query);
    console.log('in get data',url,query);
    let response;
    console.log({query})
    let condition = ''
    if (query) {
        condition = convertCondition(query)
        console.log("condition",{ condition })
    }

    try {
        response = await server.get(`${url}${condition}`);
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
        console.log("in postdata");
        console.log({ url, body: JSON.stringify(body) })
        response = await server.post(url, body);
        console.log({response});
        return response
    }
    catch (error) {
        throw error;
    }
}

const putData = async (url, body) => {
    let response;
    try {
        console.log("hello put");
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
        response = await server.delete(url, { data: body });
        return response
    }
    catch (error) {
        console.log({ error: error.message })
        throw error;
    }
}


const queryTypes = {
    AND:'AND', OR:'OR', BETWEEN:'BETWEEN', STARTWITH:'STARTWITH', ENDWIDTH:'ENDWITH', INCLUDES:'INCLUDES'
}

const checkQueryType= (type)=>{
    return Object.values(queryTypes).includes(type)
}


function convertCondition(obj) {
    // let obj = {AND:[{ClientCode:885417},{City:'אשדוד'}],OR:[{Ovligo:4},{ZipCode:77452}]}
    //{ AND: [{ Ovligo: 4 }, { OR: [{ City: אשדוד }, { City: בני-ברק }] }], OR: [{ ZipCode: 77452 }, { ZipCode: 74522 }] }
    // /read/readAll?start=AND&Ovligo=4&start=OR&City=אשדוד&City=בני-ברק&end=OR&end=AND&start=OR&ZipCode=77452&ZipCode=74522&end=OR
    // let obj = { AND: [{ Ovligo: 4 }, { OR: [{ City: 'אשדוד' }, { City: 'בני-ברק' }] }], OR: [{ ZipCode: 77452 }, { ZipCode: 74522 }] }
    let str = '?'
    let i = 0;
    const getArgumentsStr = (arg) => {

        if (arg && arg.length == undefined) { //arg is object
            console.log(Object.keys(arg).length)
            for(let key in arg){
                console.log({key})
                console.log(arg[key])
                if(checkQueryType(key)){
                    str += `start_${i++}=${key}&`
                    str = getArgumentsStr(arg[key])
                    str += `end_${i++}=${key}&`
                }
                else{
                    console.log({str})
                     str += `${key}_${i++}=${arg[key]}&`
                }
            }
            // if (Object.keys(arg).length == 1 && typeof (arg[Object.keys(arg)[0]]) != 'object') { // arg is simple object
            //     let objKey = Object.keys(arg)[0]
            //     console.log({ objKey })
            //     return str + `${objKey}${i++}=${arg[objKey]}&`
            // }
            // Object.keys(arg).forEach(a => {
            //     if (arg[a].length) {
            //         str += `start${i++}=${a}&`
            //         str = getArgumentsStr(arg[a])
            //         str += `end${i++}=${a}&`
            //     }
            //     else{
            //         console.log(str)
            //         str = getArgumentsStr(arg[a])
            //     }

            // })
        }
        else { //arg is array
           console.log("in else",arg);
            arg.forEach(element => {
                str = getArgumentsStr(element, str)
                console.log(str)
            });
        }
        return str
    }
    console.log({ obj })
    getArgumentsStr(obj);
    str = str.substring(0, str.length - 1)
    console.log( "str",str);
    return str;
}


module.exports = { getData, postData, putData, deleteData, queryTypes }

