require('dotenv').config()

const { MongoClient } = require('mongodb');

const { MONGO_CONNECTION } = process.env;
let client = null;

const connect = async (server_url = MONGO_CONNECTION) => {
    client = new MongoClient(server_url);
    try {
        await client.connect()
    }
    catch (error) {
        throw `Can't connect to ${server_url}`
    }
}

const disconnect = async () => {
    if (client == null) {
        throw new Error('client must be connected to mongo')
    }
    await client.close()
}

const getClient = () => client;

module.exports = { connect, disconnect, getClient };
