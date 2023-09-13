const newsModel = require('../../models/newsModel')
const newsService = {
    add: async ({
        title, content, category, isPublish, cover, editTime
    }) => {
        return newsModel.create({
            title, content, category, isPublish, cover, editTime
        })
    },
    updateList:async({
       _id, title, content, category, isPublish, cover, editTime
    })=>{
        if(cover){
            return newsModel.updateOne({_id},{
                title, content, category, isPublish, cover, editTime
            })
        }else{
            return newsModel.updateOne({_id},{
                title, content, category, isPublish,  editTime
            })
        }
    },
    getList: async ({ _id }) => {
        return _id ? newsModel.find({ _id }) : newsModel.find({})
    },
    publish: async ({ _id, isPublish, editTime }) => {
        return newsModel.updateOne({
            _id
        }, {
            isPublish,
            editTime
        })
    },
    delList: async ({ _id }) => {
        return newsModel.deleteOne({
            _id
        })
    }
}

module.exports = newsService