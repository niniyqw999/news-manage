const newsModel = require('../../models/newsModel')
const newsService = {
    getList: async ({ _id }) => {
        return _id ? newsModel.find({ _id,isPublish:1 }) : newsModel.find({isPublish:1}).sort({editTime:-1})
    },
    getRightList: async ({ limit }) => {
        return  newsModel.find({isPublish:1}).sort({editTime:-1}).limit(limit)
    },
}

module.exports = newsService