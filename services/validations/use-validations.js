
const { getValidationsModule } = require('./validations-objects')
let i = 0;
const checkObjectValidations = async (body, objName, find=false) => {
    console.log("insert to use - validation");
    try {
        console.log(body, objName, 'bodyAndObjectname');
        const values = getValidationsModule(find).find(({ objectName }) => objName === objectName).values;
        for (let v of values) {
            i++
            for (let valid of v.validation) {
                if (body[v.propertyName]) {
                    if (!(await valid.func(body[v.propertyName], valid.arguments))) {
                        return false;

                    }

                 
                }
            }
           
            if (v.require && !body[v.propertyName]) {
                throw new Error(`the ${v.propertyName} is required but not exist`);
            }
        }
        return true;
    }
    catch (error) {
        console.log(error.message)
        throw error
    }


};


module.exports = { checkObjectValidations };
