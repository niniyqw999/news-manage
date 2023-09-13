// 产品数据接口[企业官网]
var express = require('express');
const productController = require('../../controllers/web/productController');
var productRouter = express.Router();

productRouter.get("/webapi/product/list",productController.getList)// 获取产品数据

module.exports = productRouter