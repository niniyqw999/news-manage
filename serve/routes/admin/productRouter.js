var express = require('express');
var productRouter = express.Router();

const productController=require('../../controllers/admin/productController')
const multer=require('multer')
const upload=multer({dest:'public/productuploads/'})

//添加产品
productRouter.post('/adminapi/product/add',upload.single('file'),productController.add)
//请求产品列表数据
productRouter.get('/adminapi/product/list',productController.getList)
//更新产品
productRouter.post('/adminapi/product/list',upload.single('file'),productController.updateList)
//获取需要编辑的单个产品数据
productRouter.get('/adminapi/product/list/:id',productController.getList)
//删除产品
productRouter.delete('/adminapi/product/list/:id',productController.delList)
module.exports = productRouter;