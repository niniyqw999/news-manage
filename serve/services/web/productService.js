// 产品接口联通数据库
const productModel = require("../../models/productModel")

const productService = {
    // 获取产品数据
    getList:async ({_id})=>{
        return _id?productModel.find({_id}):productModel.find()
    },    
   
}

module.exports = productService