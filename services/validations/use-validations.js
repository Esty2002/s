const { objectsForValidations } = require('./validations-objects')
let i = 0;
const checkObjectValidations = async (body, objName) => {
    try {
        const values = objectsForValidations.find(({ objectName }) => objName === objectName).values
        for (let v of values) {
            i++
            for (let valid of v.validation) {
                if (body[v.propertyName]) {
                    if (!(await valid.func(body[v.propertyName], valid.arguments))) {
                        return false;
                    }

                    // console.log(body[v.propertyName], 'yyyeeesss');
                    // if (!(await valid.func(body[v.propertyName], valid.arguments))) {
                    //     console.log('@@@@@@@@@@@@  nnnnnnnnnnno');
                    // return false;
                    // }
                }
            }

            if (v.require && !body[v.propertyName]) {
                console.log("hello checkObjectValidations for");
                throw new Error(`the ${v.propertyName} is required but not exist`);
            }
        }

        return true;
    }
    catch (error) {
        console.log(error.message," error");
        throw error
    }


};


module.exports = { checkObjectValidations };
