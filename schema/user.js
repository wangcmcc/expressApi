// 导入验证规则包
const joi = require('joi')

// 定义用户名和密码规则
const username =joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// 修改用户信息时 定义id nickname email的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

// 验证头像的规则  base64格式的字符串
const avatar = joi.string().dataUri().required()

// 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
   body: {
       username,
       password
   }
}

exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}

exports.update_password_schema = {
    body: {
        // 符合密码规则验证
        oldPwd: password,
        // joi.ref('oldPwd') 表示新旧密码一致  joi.not(joi.ref('oldPwd')) 表示不一致
        // 。concat() 用于 合并joi.not(joi.ref('oldPwd'))和passWord密码规则
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}


// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
exports.update_avatar_schema = {
    body: {
        avatar
    }
}