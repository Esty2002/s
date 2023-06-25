const express=require('express')
const router=express.Router()
const{getAllPriceList,getPriceListById,getPriceListByAddedDate,getPriceListbyProduct,getNameOfProduvtsById,getPriceListByAreaId,getPriceListbySupplierCodeOrClientCode,getPriceListByIdSupplierOrClientCode,getPriceListByIdPriceListId,getPriceListByAdditionsForDistance} =require('../../modules/pricelist/readPricelist')

router.get('/findAllPriceList', async (req, res) => {
    try {
        const result = await getAllPriceList();
            res.status(200).send(result);
    } 
    catch (error) {
        res.status(500).send(error);
    }


})
// חיפוש מחירון לפי ID
router.get('/FindPriceListById/:id', async (req, res) => {
    try {
        const result = await getPriceListById(req.params.id);
            res.status(200).send(result);
    } 
    catch (error) {
        res.status(500).send(error);
    }


})
// פונקצית חיפוש מחירון לפי תאריך הוספה
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
// הפונקציה מקבלת שם אזור ומחזירה מחירון שקשורה אליו
router.get('/FindPriceListByAreaId/:area', async (req, res) => {
    console.log(req.params.area);

    try {
        const ans =await getPriceListByAreaId(req.params.area)
        res.status(200).send(ans)
    } catch (error) {
        res.status(404).send(error)

    }
})
// הפונקציה מקבלת שם אזור ומחזירה מחירון שקשורה אליו
router.get('/FindPriceListBySupplerCodeOrClientCode/:code', async (req, res) => {
    console.log("zzzzzzzzzzzzzzzzz");
    console.log(req.params.code);
    try {
        const ans =await getPriceListbySupplierCodeOrClientCode(req.params.code)
        console.log(ans);
        res.status(200).send(ans)
    } catch (error) {
        res.status(404).send(error)

    }
})
// חיפוש הצעת מחיר עפ מספר מחירון  לפי ספק 
router.get('/FindPriceListByIdSupplierOrClientCode/:id', async (req, res) => {
    console.log(req.params.id);
    try {
        const ans =await getPriceListByIdSupplierOrClientCode(req.params.id)
        res.status(200).send(ans)
    } catch (error) {
        res.status(404).send(error)

    }
})
//חיפוש מוצר על פי מספר  מחירון
router.get('/FindPriceListByProduct/:id', async (req, res) => {
    try {
        const ans =await getPriceListByIdPriceListId(req.params.id)
        console.log(ans);
        res.status(200).send(ans)
    } catch (error) {
        res.status(404).send(error)

    }
})
router.get('/FindPriceListByProduct/:id', async (req, res) => {
    try {
        const ans =await getNameOfProduvtsById(req.params.id)
        console.log(ans);
        res.status(200).send(ans)
    } catch (error) {
        res.status(404).send(error)

    }
})
// חיפוש מחירון לפי 
router.get('/FindPriceListByAdditionsForDistance/:id', async (req, res) => {
    try {
        const ans =await getPriceListByAdditionsForDistance(req.params.id)
        console.log(ans);
        console.log("lllllllllllllllllllll");
        res.status(200).send(ans)
    } catch (error) {
        res.status(404).send(error)

    }
})
// ReadPriceListByAdditionsForDistance

module.exports=router;