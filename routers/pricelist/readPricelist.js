const express=require('express')
const router=express.Router()
const{getAllPriceList,getPriceListById,getPriceListByAddedDate,getPriceListbyProduct,GetPriceListByAreaId} =require('../../modules/pricelist/readPricelist')

router.get('/findAllPriceList', async (req, res) => {
    try {
        const result = await getAllPriceList();
            res.status(200).send(result);
    } 
    catch (error) {
        res.status(500).send(error);
    }


})
// חיפוש הצעת מחיר לפי ID
router.get('/FindPriceListById/:id', async (req, res) => {
    try {
        const result = await getPriceListById(req.params.id);
            res.status(200).send(result);
    } 
    catch (error) {
        res.status(500).send(error);
    }


})
// פונקצית חיפוש הצעת מחיר לפי תאריך הוספה
router.get('/FindPriceListByAddedDate/date', async (req, res) => {
    try {
        const result = await getPriceListByAddedDate(req.params.date);
            res.status(200).send(result);
    } 
    catch (error) {
        res.status(500).send(error);
    }


})
// פונקציית חיפוש על פי מוצר
router.get('/FindPriceListByProduct/product', async (req, res) => {
    try {
        const result = await getPriceListbyProduct(req.params.product);
            res.status(200).send(result);
    } 
    catch (error) {
        res.status(500).send(error);
    }


})
// הפונקציה מקבלת שם אזור ומחזירה הצעת מחיר שקשורה אליו
router.get('/FindPriceListByAreaId/:area', async (req, res) => {
    try {
        const ans = GetPriceListByAreaId(req.params.areaId)
        res.status(200).send(ans)
    } catch (error) {
        res.status(404).send(error)

    }

})

module.exports=router;