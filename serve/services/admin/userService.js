const userModel = require('../../models/userModel')
const userService={
    login:async({username,password})=>{
        return userModel.find({
            username,
            password
        })
    },
    upload:async({_id,username,introduction,gender,avatar})=>{
        if(avatar){
            return userModel.updateOne({
                _id
            },{
                username,introduction,gender,avatar
            })
        }else{
            return userModel.updateOne({
                _id
            },{
                username,introduction,gender
            })
        }
    },
    add:async({username,password,introduction,gender,avatar,role})=>{
            return userModel.create({
                username,password,introduction,gender,avatar,role
            })
    },
    // 获取用户列表数据
    getList:async ({id})=>{
        // 判断是否有用户id传进来,有则搜索单一用户,无则搜索全部用户
        return id?userModel.find({_id:id},["username","role","avatar","introduction","gender"]):
        userModel.find({},["username","role","avatar","introduction","gender"])
    },

    // 删除用户数据
    delList:async ({_id})=>{
        return userModel.deleteOne({_id})
    },

    // 修改用户数据(用户列表)
    putList:async(body)=>{
        return userModel.updateOne({_id:body._id},body)
    },
}

module.exports=userService