var express = require('express');
var newsRouter = express.Router();
const newsController=require('../../controllers/admin/newsController')
//图片上传
const multer=require('multer')
const upload=multer({dest:'public/newsuploads/'})

//涉及文件上传，需要加上multer中间件
//添加新闻
newsRouter.post('/adminapi/news/add',upload.single('file'),newsController.add)
//获取新闻列表
newsRouter.get('/adminapi/news/list',newsController.getList)
//更新新闻
newsRouter.post('/adminapi/news/list',upload.single('file'),newsController.updateList)
//获取需要编辑的单个新闻数据
newsRouter.get('/adminapi/news/list/:id',newsController.getList)
//改变新闻是否发布的状态
newsRouter.put('/adminapi/news/publish',newsController.publish)
//删除新闻
newsRouter.delete('/adminapi/news/list/:id',newsController.delList)

module.exports = newsRouter;