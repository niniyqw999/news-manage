const productModel = require('../../models/productModel')
const productService = {
    add: async ({
        product,description,details,picture, editTime
    }) => {
        return productModel.create({
            product,description,details,picture, editTime
        })
    },
    updateList:async({
       _id, product,description,details,picture, editTime
    })=>{
        if(picture){
            return productModel.updateOne({_id},{
                product,description,details,picture, editTime
            })
        }else{
            return productModel.updateOne({_id},{
                product,description,details,editTime
            })
        }
    },
    getList: async ({ _id }) => {
        return _id ? productModel.find({ _id }) : productModel.find({})
    },
    delList: async ({ _id }) => {
        return productModel.deleteOne({
            _id
        })
    }
}

module.exports = productService