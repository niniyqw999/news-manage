const newsService = require("../../services/web/newsService")

const newsController={
    getList:async(req,res)=>{
        const result = await newsService.getList({_id:req.params.id})
        res.send({
            ActionType:"ok",
            data:result
        })
    },
    getRightList:async(req,res)=>{
        const result = await newsService.getRightList({limit:req.query.limit})
        res.send({
            ActionType:"ok",
            data:result
        })
    },
}

module.exports=newsController