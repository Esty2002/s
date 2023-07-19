
const { getValidationsModule } = require('./validations-objects')
let i = 0;
const checkObjectValidations = async (body, objName, find=false) => {
    console.log("insert to use - validation");
    let errors=[]
    try {
        console.log(body, objName, 'bodyAndObjectname');
        const values = getValidationsModule(find).find(({ objectName }) => objName === objectName).values;
        for (let v of values) {
            if (!v.require && !body[v.propertyName]){
                continue
            }
            i++
            for (let valid of v.validation) {
                if (body[v.propertyName] || body[v.propertyName]===null ) {
                    try {
                        _ = await valid.func(body[v.propertyName], valid.arguments);
                    }
                    catch (error) {
                        errors = [...errors, { propertyName: v.propertyName, error: error.message }];
                    }
                }
            }
            console.log(v.require,'v.require');
            console.log(!body[v.propertyName],'!body[v.propertyName])');
            if (v.require && !body[v.propertyName])
                errors = [...errors, { propertyName: v.propertyName, error: `the ${v.propertyName} is required but not exist` }];
        }
        if (errors.length > 0) 
            throw errors
        return true;
    }
    catch (error) {
        throw error;
    }
};


module.exports = { checkObjectValidations };
