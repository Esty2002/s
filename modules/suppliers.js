const {getAll,insert}=require('../db/sql-operation');

async function getallsuppliers(){
    const result = await getAll('Suppliers')
    return result;
}
async function insertsuppliers(Obj){
    console.log("-----------",Obj);
    console.log(Object.keys(Obj).join(",")+"Object.keys(Obj).join(",")");
    console.log(Object.values(Obj)+"Object.values(Obj)");
    const result = await insert("Suppliers",Object.keys(Obj).join(","),Object.values(Obj).join(","))
    return result;
}

module.exports={getallsuppliers,insertsuppliers}