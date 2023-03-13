const {getAll,insert}=require('../db/sql-operation');

async function getallsuppliers(){
    const result = await getAll('Suppliers')
    return result;
}
async function insertsuppliers({Obj}){
    const result = await insert({Obj})
    return result;
}

module.exports={getallsuppliers,insertsuppliers}