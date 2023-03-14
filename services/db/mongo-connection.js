// require('dotenv').config()

const { MongoClient } = require('mongodb')
let client = null

const connect = async (server_url = 'mongodb://127.0.0.1:27017') => {
    if (server_url.indexOf('mongodb') != 0) {
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
    connect, disconnect, getClient
}