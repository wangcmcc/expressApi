const express = require('express')
const router = express.Router()
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入验证规则对象
const { update_userinfo_schema, update_password_schema, update_avatar_schema} = require('../schema/user') 
const { getUserInfo, updateUserInfo, updatePassWord, updateAvatar } = require('../router_handler/userinfo')


// 获取用户基本信息的路由
router.get('/userinfo', getUserInfo)

// 更新用户信息的路由
router.post('/userinfo', expressJoi(update_userinfo_schema), updateUserInfo)

// 重置密码
router.post('/updatepwd', expressJoi(update_password_schema), updatePassWord)


// 更新头像的路由
router.post('/update/avatar', expressJoi(update_avatar_schema), updateAvatar)
module.exports = router
