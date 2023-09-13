var express = require('express');
var newsRouter = express.Router();
const newsController=require('../../controllers/web/newsController')

newsRouter.get('/webapi/news/list',newsController.getList)
newsRouter.get('/webapi/news/list/:id',newsController.getList)
newsRouter.get('/webapi/news/rightlist',newsController.getRightList)

module.exports = newsRouter;