var express = require('express');
const userController = require('../../controllers/admin/userController');
var userRouter = express.Router();
//图片上传
const multer=require('multer')
const upload=multer({dest:'public/avataruploads/'})

/* GET home page. */
userRouter.post('/adminapi/user/login',userController.login)
userRouter.post('/adminapi/user/upload',upload.single('file'),userController.upload)
userRouter.post('/adminapi/user/add',upload.single('file'),userController.add)
userRouter.get("/adminapi/user/list",userController.getList)// 获取用户数据接口(用户列表)
userRouter.get("/adminapi/user/list/:id",userController.getList)// 获取用户数据接口(单一用户,编辑用户)
userRouter.put("/adminapi/user/list/:id",userController.putList)// 修改用户数据接口(单一用户,编辑用户)
userRouter.delete("/adminapi/user/list/:id",userController.delList)// 删除用户数据接口(动态路由形式)


module.exports = userRouter;
