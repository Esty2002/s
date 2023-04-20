
require('dotenv').config()
const { MongoClient } = require('mongodb')
let client = null
const{MONGO_CONNECTION}=process.env
// const connect = async (server_url = 'mongodb://127.0.0.1:27017') => {
//     if (server_url.indexOf('mongodb') != 0) {
// const { MongoClient } = require('mongodb')
// const { MONGO_CONNECTION } = process.env

// let client = null
//     }
const connect1 = async (server_url = MONGO_CONNECTION) => {
    if (server_url.trim().indexOf('mongodb') != 0) {
        throw new Error('connection string is not in the right format.')
    }
    client = new MongoClient(server_url.trim())
    await client.connect()
}

const disconnect = async () => {
    if (client == null) {
        throw new Error('client is still null')
    }
    await client.close()
}

const getClient = () => {
    return client
}

module.exports = {
    connect1, disconnect, getClient
}

