const { buildBasicCementCombinations, getBasicCementItemName, addPropertiesToCementCombinations } = require("../products/basicProducts");
const { modelNames, models } = require("../utils/schemas");


const priceListType = [
    {
        name: 'cement', products: [modelNames.ADDITION, modelNames.FINISH_PRODUCTS, modelNames.BASIC_PRODUCTS]
    },
    {
        name: 'pumps', products: [modelNames.PUMPS]
    }
]

function getProductsTypeNameForPricelist(types) {
    const typelist = priceListType.filter(({ name }) => types.includes(name))
    const response = typelist.reduce((list, { products }) => [...list, ...products], [])
    return response
}

 function combineBasicProducts(basicCementItems){
    let basicCementCombinations = buildBasicCementCombinations(basicCementItems.map(({ product }) => product))
    basicCementCombinations = basicCementCombinations.filter(combination => !combination.includes(undefined))
    if (basicCementCombinations.length > 0) {
        basicCementCombinations = basicCementCombinations.map(item => item.map(({ model, ...rest }) => ({ ...rest, entity: model.entity })))
        basicCementCombinations = basicCementCombinations.map(item => ({
            combination: item, name: item.reduce((name, it) => [...name, getBasicCementItemName(it)], []).join(' '), entity: 'basicProducts'
        }))
        basicCementCombinations = addPropertiesToCementCombinations({
            originList: basicCementItems,
            combinationList: basicCementCombinations,
            props: [models.PRODUCTS_PRICE_LIST.fields.PRICE.name, models.PRODUCTS_PRICE_LIST.fields.DISCOUNT.name]
        })

    }
    return basicCementCombinations;
}

module.exports = {  getProductsTypeNameForPricelist, combineBasicProducts }