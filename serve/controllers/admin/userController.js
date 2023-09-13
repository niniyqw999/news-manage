const userService=require('../../services/admin/userService')
const JWT = require('../../until/JWT')
require('../../until/JWT')
const userController = {
    //登录返回用户数据
    login: async (req, res) => {
        var result = await userService.login(req.body)
        if (result.length === 0) {
            res.send({
                code: '-1',
                error: '用户名密码不匹配'
            })
        } else {
            //生成token
            const token = JWT.generate({
                _id:result[0]._id,
                username:result[0].username
            },'1d')

            res.header('Authorization',token)
            res.send({
                ActionType: 'ok',
                data:{
                    username:result[0].username,
                    gender:result[0].gender?result[0].gender:0,
                    introduction:result[0].introduction,
                    avatar:result[0].avatar,
                    role:result[0].role
                }
            })
        }
    },
    //更新用户数据
    upload:async (req, res) => {
        const {username,introduction,gender}=req.body
        const token = req.headers['authorization'].split(' ')[1]
        const avatar = req.file?`/avataruploads/${req.file.filename}`:''
        var payload = JWT.verify(token)
        //调用service模块更新数据库信息
        await userService.upload({_id:payload._id,username,introduction,gender:Number(gender),avatar})
        if(avatar){
            res.send({
                ActionType:'ok',
                data:{
                    username,introduction,
                    gender:Number(gender),
                    avatar
                }
            })
        }else{
            res.send({
                ActionType:'ok',
                data:{
                    username,introduction,
                    gender:Number(gender)
                }
            })
        }
    },
    //添加用户数据
    add:async(req,res)=>{
        const {username,introduction,gender,role,password}=req.body
        const avatar = req.file?`/avataruploads/${req.file.filename}`:''
        //调用service模块更新数据库信息
        await userService.add({username,password,introduction,gender:Number(gender),avatar,role:Number(role)})
            res.send({
                ActionType:'ok',
            })
    },
    //获取用户列表数据
    getList:async (req, res) => {
        const result = await userService.getList(req.params)
        res.send({
            ActionType:"ok",
            data:result
        })
    },
    // 删除用户数据
    delList:async (req,res)=>{
        // console.log('要删除的用户id',req.params.id)
        const result = await userService.delList({_id:req.params.id})
        res.send({
            ActionType: "ok"
        })
    },
    
    // 修改用户数据(用户列表)
    putList:async (req,res)=>{
        const result = await userService.putList(req.body)
        res.send({
            ActionType: "ok"
        })
    },
}


module.exports = userController