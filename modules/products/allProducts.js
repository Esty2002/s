const { findPump } = require('./pumps');
const { findAddition } = require('./additions');
const { findFinishProduct } = require('./finishProducts');
const { getCementTraits } = require('./basicProducts');
const { modelNames } = require('../utils/schemas');

const basicProductType = [modelNames.CEMENT_DEGREE, modelNames.CEMENT_GRAIN, modelNames.CEMENT_SOMECH, modelNames.CEMENT_STRENGTH]

async function getProductsListByType(modelname) {
    let result = null
    try {
        switch (modelname) {
            case modelNames.PUMPS: {
                let response = await findPump()
                if (response.status === 200)
                    result = response.data
            }
                break;
            case modelNames.ADDITION:
                {
                    let response = await findAddition()
                    if (response.status === 200)
                        result = response.data
                }
                break;
            case modelNames.FINISH_PRODUCTS:
                {
                    let response = await findFinishProduct()
                    if (response.status === 200)
                        result = response.data
                }

                break;
            case modelNames.BASIC_PRODUCTS:
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

module.exports = { getProductsListByType }