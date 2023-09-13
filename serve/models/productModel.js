const mongoose=require('mongoose')
const Schema=mongoose.Schema

const productType={
    product:String,
    description:String,
    details:String,    
    picture:String,
    editTime:Date 
}

const productModel= mongoose.model('product',new Schema(productType))

module.exports=productModel