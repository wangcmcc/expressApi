const express = require('express')
const { addArticle } = require('../router_handler/article')
const { add_article_schema } = require('../schema/article')
// 导入解析formdata 格式的表单数据的包
const multer = require('multer')
// 导入内置的路径处理核心模块
const path = require('path')
const expressJoi = require('@escook/express-joi')


// 创建multer 的实例对象  通过dest属性指定文件存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })

const router = express.Router()


router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), addArticle)


module.exports = router