const newsService = require("../../services/admin/newsService")

const newsController={
    add:async (req,res)=>{
        const cover=req.file?`/newsuploads/${req.file.filename}`:''
        const {title,content,category,isPublish}=req.body
        //调用service进行添加
        await newsService.add({
            title,content,category:Number(category),isPublish:Number(isPublish),cover,editTime:new Date()
        })
        res.send({
            ActionType:'ok'
        })
    },
    getList:async(req,res)=>{
        const result = await newsService.getList({_id:req.params.id})
        res.send({
            ActionType:"ok",
            data:result
        })
    },
    updateList:async(req,res)=>{
        const cover=req.file?`/newsuploads/${req.file.filename}`:''
        const {title,content,category,isPublish,_id}=req.body
        //调用service进行添加
        await newsService.updateList({
            _id,title,content,category:Number(category),isPublish:Number(isPublish),cover,editTime:new Date()
        })
        res.send({
            ActionType:'ok'
        })
    },
    publish:async(req,res)=>{
        await newsService.publish({
            ...req.body,
            editTime:new Date()
        })
        res.send({
            ActionType:"ok",
        })
    },
    delList:async(req,res)=>{
        await newsService.delList({_id:req.params.id})
        res.send({
            ActionType:'ok'
        })
    }
}

module.exports=newsController