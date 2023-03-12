const {getAll}=require('../db/sql-operation');

async function getallbranches(){
    const result = await getAll('Branches')
    return result;
}

module.exports={getallbranches}