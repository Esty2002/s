require('dotenv');
const axios=require('axios');
const {SQL_SERVER_HOST,SQL_SERVER_PORT}=process.env

const sqlServer=axios.create({
    baseURL:`http://${SQL_SERVER_HOST}:${SQL_SERVER_PORT}`
})


const getData=async(server,url)=>{
    let response;
    try{
        response=await server.get(url);
    }

    catch(error){
        throw error;
    }
    return response;
}

const postData=async(server,url,body)=>{
    let response;
    try{
        console.log(body,' body');
        response=await server.post(url,body);
        console.log('after');
    }
    

    catch(error){
        throw error;
    }
    return response;
}
module.exports={sqlServer,getData,postData}