const productService = require("../../services/admin/productService")

const productController={
    add:async (req,res)=>{
        const picture=req.file?`/productuploads/${req.file.filename}`:''
        const {product,description,details}=req.body
        //调用service进行添加
        await productService.add({
            product,description,details,picture,editTime:new Date()
        })
        res.send({
            ActionType:'ok'
        })
    },
    getList:async(req,res)=>{
        const result = await productService.getList({_id:req.params.id})
        res.send({
            ActionType:"ok",
            data:result
        })
    },
    updateList:async(req,res)=>{
        const picture=req.file?`/newsuploads/${req.file.filename}`:''
        const {product,description,details,_id}=req.body
        //调用service进行添加
        await productService.updateList({
            _id,product,description,details,picture,editTime:new Date()
        })
        res.send({
            ActionType:'ok'
        })
    },
    delList:async(req,res)=>{
        await productService.delList({_id:req.params.id})
        res.send({
            ActionType:'ok'
        })
    }
}

module.exports=productController