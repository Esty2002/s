const { modelNames } = require("../utils/schemas");
const { findAddition } = require("../products/additions");
const { findFinishProduct } = require("../products/finishProducts");
const { findPump } = require("../products/pumps");
const { getCementTraits } = require("../products/basicProducts");

const productsTypes = {
    PUMPS: {
        entity: modelNames.PUMPS
    },
    ADDITIONS: {
        entity: modelNames.ADDITION
    },
    FINISH_PRODUCTS: { entity: modelNames.FINISH_PRODUCTS },
    BASIC_PRODUCTS: { entity: modelNames.BASIC_PRODUCTS }
}

const priceListType = [
    {
        name: 'cement', products: [modelNames.ADDITION, modelNames.FINISH_PRODUCTS, modelNames.BASIC_PRODUCTS]
    },
    {
        name: 'pumps', products: [modelNames.PUMPS]
    }
]

const basicProductType = [modelNames.CEMENT_DEGREE, modelNames.CEMENT_GRAIN, modelNames.CEMENT_SOMECH, modelNames.CEMENT_STRENGTH]


async function getProductsListByType(modelname) {
    let result = null
    try {
        switch (modelname) {
            case productsTypes.PUMPS.entity: {
                let response = await findPump()
                if (response.status === 200)
                    result = response.data
            }
                break;
            case productsTypes.ADDITIONS.entity:
                {
                    let response = await findAddition()
                    if (response.status === 200)
                        result = response.data
                }
                break;
            case productsTypes.FINISH_PRODUCTS.entity:
                {
                    let response = await findFinishProduct()
                    if (response.status === 200)
                        result = response.data
                }

                break;
            case productsTypes.BASIC_PRODUCTS.entity:
                result = await Promise.all(basicProductType.map(async type => {
                    let response = await getCementTraits(type)
                    if (response.status === 200) {
                        return { title: type, items: response.data }
                    }
                }


                    // ({ title: type, items: await getCementTraits(type) })

                ))
                // result.data = result
                
                break;
            default:
                break;
        }
        return result
    }
    catch (error) {
        console.log(error)
        throw error
    }

}

function getProductsTypeNameForPricelist(types) {
    const typelist = priceListType.filter(({ name }) => types.includes(name))
    const response = typelist.reduce((list, { products }) => [...list, ...products], [])

    return response
}

module.exports = { getProductsListByType, getProductsTypeNameForPricelist }