require('dotenv').config()
const { postData, getData } = require('../../services/axios')
const { compareExactArrayValues, compareExactObjectsValues } = require('../utils/object-code')
const { modelNames, getModel, getObjectModel } = require('../utils/schemas')
const { SQL_PRODUCTS_TABLE } = process.env

const basicProductsModels = [modelNames.CEMENT_STRENGTH, modelNames.CEMENT_GRAIN, modelNames.CEMENT_SOMECH, modelNames.CEMENT_DEGREE]


function combineOptions(lists) {
    if (lists.length === 2) {
        let list1 = lists[0]
        let list2 = lists[1]
        const combination = list1.reduce((arr, item) => {
            if (Array.isArray(item) === false)
                item = [item]
            const innercombination = list2.map(item2 => {
                if (Array.isArray(item2) === false)
                    item2 = [item2]
                return [...item, ...item2]
            })
            return [...arr, ...innercombination]

        }, [])
        return combination
    }
    else {
        let result = combineOptions([lists[0], lists[1]])
        for (let i = 2; i < lists.length; i++) {
            result = combineOptions([result, lists[i]])
        }
        return result
    }

}

function getBasicCementItemName(item) {
    let nameProp = Object.keys(item).find(key => key.toLowerCase().indexOf('describe'))
    return item[nameProp]
}

function orderCombination(combination) {
    let order = combination.reduce((combine, item) => {
        const { model } = item
        combine[basicProductsModels.indexOf(model.entity)] = item
        return combine
    }, [])
    return order
}


function buildBasicCementCombinations(list) {
    const optionModels = [
        getModel(modelNames.CEMENT_STRENGTH),
        getModel(modelNames.CEMENT_GRAIN),
        getModel(modelNames.CEMENT_SOMECH),
        getModel(modelNames.CEMENT_DEGREE)
    ]
    list = list.map(item => ({ ...item, model: optionModels.find(model => getObjectModel(item, model)) }))
    const groups = list.reduce((grouplist, item) => {
        if (grouplist.length === 0) {
            grouplist.push({ key: item.model, items: [item] })
        }
        else {
            const group = grouplist.find(g => g.key === item.model)
            if (group) {
                group.items.push(item)
            }
            else {
                grouplist.push({ key: item.model, items: [item] })
            }
        }
        return grouplist
    }, [])
    let combination = combineOptions(groups.map(({ items }) => items))
    combination = combination.map(item => orderCombination(item))
    return combination
}

function addPropertiesToCementCombinations({ originList, combinationList, props }) {
    for (let item of originList) {
        for (let prop of props) {
            if (item[prop]) {
                let val = item[prop]
                const filter = combinationList.filter(({ combination }) => combination.find(({ entity, ...rest }) => entity === item.entity &&
                    compareExactObjectsValues(rest, item.product)))
                filter.forEach(combination => {
                    if (combination[prop]) {
                        combination[prop] += val
                    }
                    else {
                        combination[prop] = val
                    }

                });

            }
        }
    }

    return combinationList
}

async function getBasicProducts() {
    try {
        const response = await getData(`/read/readMany/${modelNames.BASIC_PRODUCTS}`);
        if (response.status === 200) {
            return response
        }
        return []
    }
    catch (error) {
        throw error;
    }
}

async function getCementTraits(basicproducts) {
    try {
        console.log({ basicproducts })
        const response = await getData(`/read/readMany/${basicproducts}`)
        if (response.status === 200)
            return response
        else
            throw new Error('no')
    }
    catch (error) {
        throw error;
    }
}





module.exports = {
    basicProductsModels,
    getBasicProducts,
    getCementTraits,
    combineOptions,
    getBasicCementItemName,
    buildBasicCementCombinations,
    addPropertiesToCementCombinations
}
