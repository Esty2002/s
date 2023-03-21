
const {createReceiptSql ,
    createCreditReceiptsql ,
    createCashReceiptsql ,
    createChequeReceiptsql,
    createBankTransferReceiptsql,
    createStandingOrderReceiptsql,
    getReceiptNumbersql} =require('../services/sql/sql-operations')


async function createReceipts(obj){
    console.log(obj);
    const result = await createReceiptSql(obj)
    // console.log({result});
}

async function createCashReceiptMod(obj){
    console.log(obj);
    const result = await createCashReceiptsql(obj)
    // console.log({result});
}

async function createCreditReceiptMod(obj){
    console.log(obj);
    const result = await createCreditReceiptsql(obj)
    // console.log({result});
}

async function createChequeMod(obj){
    console.log(obj);
    const result = await createChequeReceiptsql(obj)
    // console.log({result});
}

async function createBankTransferMod(obj){
    console.log(obj);
    const result = await createBankTransferReceiptsql(obj)
    // console.log({result});
}

async function createStandingOrderMod(obj){
    console.log(obj);
    const result = await createStandingOrderReceiptsql(obj)
    // console.log({result});
}
async function getReceiptNumberMod(){
    const result = await getReceiptNumbersql()

}

module.exports={createReceipts ,
createCreditReceiptMod ,
createCashReceiptMod ,
createCreditReceiptMod ,
createBankTransferMod,
createChequeMod,
createStandingOrderMod,
getReceiptNumberMod}