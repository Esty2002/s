require('dotenv').config()

const { MongoDBOperations } = require('../services/db/mongo/mongo-operation')
const { MONGO_COLLECTION } = process.env

const mongo_operations = new MongoDBOperations()

async function insertProduct(obj) {
    obj['ordinalNumber'] = await (mongo_operations.countDocuments()) + 1
    return await mongo_operations.insertOne(obj)
}

async function getTraits(filter, project, sort) {
    filter['enabled'] = true
    return await mongo_operations.find(filter, project, sort)
}
async function updateProduct(condition, obj) {
    return await mongo_operations.update(condition, obj)
}

async function createCartesian(strat) {
    let words = strat.split(' ')
    let counter = 0
    let string = ''
    let obj = ''
    let arr = []
    try {
        if (words[0] != '') {
            for (; counter < words.length; counter++) {
                string += counter % 2 ? await searchValue(words[counter], words[words.indexOf(words[counter]) - 1]) : await searchShort(words[counter]) + " "
            }
            string += counter % 2 ? await searchValue('', words[counter - 1] + await searchShort(words[counter - 1])) + " " : ' '
            arr.push(...words.filter((_, i) => i % 2 == 0))
            arr[arr.length - 1] = (arr[arr.length - 1] + await searchShort(arr[arr.length - 1]))
            for (let i = 0; i < arr.length; i++) {
                obj += "(^" + arr[i].split(' ')[0] + "$)|"
            }
            let trait = await getTraits({ shortTrait: { $not: { $regex: `${obj.slice(0, -1)}` } } }, { _id: 0, values: { $slice: 1 }, shortTrait: 1 })
            for (const iterator of trait) {
                string += iterator.shortTrait + " " + iterator.values[0].name + " "
            }
        }
        return string
    }
    catch (error) {
        return error.message
    }
}

async function searchValue(value, short) {
    let w = await getTraits({ shortTrait: short }, { values: { $elemMatch: { name: { $regex: `^${value}` }, enabled: true } }, _id: 0 })
    try {
        return w.slice(w.indexOf(value) + value.length)
    }
    catch {
        throw new Error('הערך המבוקש לא קיים במערכת')
    }
}

async function searchShort(short) {
    let w = await getTraits({ shortTrait: { $regex: `^${short}` }, must: true }, { _id: 0, shortTrait: 1, "values.name": 1 })
    try {
        return w[0].shortTrait.slice(w[0].shortTrait.indexOf(short) + short.length)
    }
    catch {
        throw new Error('המאפיין המבוקש לא קיים במערכת')
    }
}

module.exports = { insertProduct, getTraits, updateProduct, createCartesian }
