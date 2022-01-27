const express = require('express')

const router = express.Router()
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

const { getArticleCates, addArticleCates, deleteCateById, getArtCateById, updateCateById } = require('../router_handler/artcate')
// 导入验证规则
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/artcate')


// 获取文章分类列表数据的路由
router.get('/cates', getArticleCates)

// 新增文章分类路由
router.post('/addcates', expressJoi(add_cate_schema), addArticleCates)

// 删除文章分类的路由
router.get('/deletecate/:id',expressJoi(delete_cate_schema), deleteCateById)

// 根据id 获取文章分类信息
router.get('/cates/:id', expressJoi(get_cate_schema), getArtCateById)

// 更新文章分类路由
router.post('/updatecate', expressJoi(update_cate_schema), updateCateById)

module.exports = router