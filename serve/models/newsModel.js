const mongoose=require('mongoose')
const Schema=mongoose.Schema

const newsType={
    title:String,
    content:String,
    category:Number,//1最新动态2典型案例3通知公告
    cover:String,
    isPublish:Number,//0未发布
    editTime:Date
}

const newsModel= mongoose.model('news',new Schema(newsType))

module.exports=newsModel