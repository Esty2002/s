require('dotenv').config()
const { postData } = require('../../services/axios')
const { modelNames, getModel, getObjectModel } = require('../utils/schemas')
const { SQL_PRODUCTS_TABLE } = process.env

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


function buildBasicCementCombinations(list) {
    const optionModels = [
        getModel(modelNames.CEMENT_DEGREE),
        getModel(modelNames.CEMENT_GRAIN),
        getModel(modelNames.CEMENT_SOMECH),
        getModel(modelNames.CEMENT_STRENGTH)
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
    const combination = combineOptions(groups.map(({ items }) => items))
    
return combination
}


async function getCementTraits(basicproducts) {
    try {
        console.log({ basicproducts })
        const response = await postData(`/read/readMany/${basicproducts}`)
        if (response.status === 200)
            return response
        else
            throw new Error('no')
    }
    catch (error) {
        throw error;
    }
}





module.exports = { getCementTraits, combineOptions, buildBasicCementCombinations }
