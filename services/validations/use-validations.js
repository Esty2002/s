
const { objectsForValidations } = require('./validations-objects')
let i = 0;
const checkObjectValidations = async (body, objName) => {
    try {
        console.log(body, objName, 'bodyAndObjectname');

        const values = objectsForValidations.find(({ objectName }) => objName === objectName).values;

        console.log(values, 'values11');
        console.log(values[0].propertyName, 'values22');
        for (let v of values) {

            i++
            console.log(i, 'iiiiiiiii');
            console.log(v.propertyName, 'sari');
for(let valid of v.validation){
          
                console.log(valid, 'vvvvvvvlllllllll', valid.arguments, valid.func);

                // let a=!valid.func(body[v.propertyName])
                // console.log(a,'aaaaaaaaaaaa');
                // console.log(v.propertyName, 'body[v.propertyName]');
                // console.log(valid.arguments, 'argumeeeeennnnnnnnntt');
                // console.log(valid.func(body[v.propertyName], valid.arguments));
                console.log(body[v.propertyName], 'oooo');
                if (body[v.propertyName]) {
                    if (!(await valid.func(body[v.propertyName], valid.arguments))) {
                        console.log('nooooooooooo');
                        return false;

                    }
                }

            }
            // console.log(v.validations,'vvvvvvvvvvv')
        }
        return true;
    }
    catch (error) {
        throw error
    }


};


module.exports = { checkObjectValidations };
