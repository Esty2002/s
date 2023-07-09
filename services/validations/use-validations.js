
const { objectsForValidations } = require('./validations-objects')
let i = 0;
const checkObjectValidations = async (body, objName) => {
    console.log("insert to use - validation");
    try {
<<<<<<< HEAD
        console.log(body, objName, 'bodyAndObjectname');
        const values = objectsForValidations.find(({ objectName }) => objName === objectName).values;
        for (let v of values) {
            i++
            for (let valid of v.validation) {
                if (body[v.propertyName]) {
                    if (!(await valid.func(body[v.propertyName], valid.arguments))) {
                        return false;

=======
        // console.log(body, objName, 'bodyAndObjectname');
        const values = objectsForValidations.find(({ objectName }) => objName === objectName).values;
        // console.log(values, 'values11');
        // console.log(values[0].propertyName, 'values22');
        for (let v of values) {
            console.log("---values---",v);
            i++
            // console.log(i, 'iiiiiiiii');
            // console.log(v.propertyName, 'sari');
            for (let valid of v.validation) {
                // console.log(v.propertyName, 'body[v.propertyName]');
                // console.log(valid.arguments, 'argumeeeeennnnnnnnntt');
                // console.log(valid.func(body[v.propertyName], valid.arguments ,"valid agrument"));
                // console.log(body[v.propertyName], v.propertyName, 'oooo');
                console.log("vvvvvvaliddddddd--",valid);
                if (body[v.propertyName]) {
                    try {
                        const val = await valid.func(body[v.propertyName], valid.arguments);
                    }
                    catch (error) {
                        throw error;
>>>>>>> logger
                    }

                    // console.log(body[v.propertyName], 'yyyeeesss');
                    // if (!(await valid.func(body[v.propertyName], valid.arguments))) {
                    //     console.log('@@@@@@@@@@@@  nnnnnnnnnnno');
                    // return false;
                    // }
                }
            }
           
            if (v.require && !body[v.propertyName]) {
                throw new Error(`the ${v.propertyName} is required but not exist`);
            }
        }
        console.log("yeeeeeeeeeeeeees:)))))))))))))");
        return true;
    }
    catch (error) {
        console.log(error.message)
        throw error
    }


};


module.exports = { checkObjectValidations };
