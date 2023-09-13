// 产品数据接口[企业官网]
const productService = require("../../services/web/productService")

const productController = {
    // 产品数据获取,解析请求参数
    getList:async (req,res)=>{
        const result =await productService.getList({_id:req.params.id})
        res.send({
            ActionType:"OK",
            data:result
        })
    }

}

module.exports = productController