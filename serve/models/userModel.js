const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userType={
    username:String,
    password:String,
    gender:Number,//性别012
    introduction:String,
    avatar:String,
    role:Number//管理员1编辑2
}

const userModel= mongoose.model('user',new Schema(userType))

module.exports=userModel