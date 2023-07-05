<<<<<<< HEAD
const { postData} = require('../../services/axios')
=======
const { postData } = require('../../services/axios')
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
async function deletedClientByCode(clientCode, userName) {
    
    let obj = {
        'tableName': 'tbl_Clients',
        'columns': '*',
        'conditio.3n': `ClientCode=${clientCode}`
    }
<<<<<<< HEAD
    const exist = await postData('http://127.0.0.1:1313/read/readTopN',obj)
    let result;
    if (exist) {

        obj['condition'] = `clientCode=${clientCode}`
        obj['values'] = {'Disabled':true,'deletionDate':new Date(),'userThatDelete':'Gpree'}

        result = await postData('http://127.0.0.1:1313/update/update', obj)

        return result;
=======
    console.log('obj',obj);
    const exist = await postData('http://127.0.0.1:1313/read/readTopN',obj)
    let result;

    if (exist.rowsAffected != 0) {
        obj['condition'] = `ClientCode=${clientCode}`
        obj['values'] = {'Disabled':true,'deletionDate':new Date(),'userThatDelete':'Gpree'}
        console.log(obj,'oopppopopopo');
        result = await postData('http://127.0.0.1:1313/update/update', obj)
        console.log(result.data,'rererererere');
        return result.data;
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
    }
    
    return false
}

module.exports = { deletedClientByCode }   