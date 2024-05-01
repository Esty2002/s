const { modelNames } = require("../utils/schemas");


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

module.exports = {  getProductsTypeNameForPricelist }