// 个人信息模块处理方法
const db = require("../db/index")

// 导入处理密码的模块
const bcrypt = require('bcryptjs')

// 获取用户信息的处理函数
exports.getUserInfo = (req, res) => {
    // 定义查询用户信息的sql
    const sql = `select id, username, nickname, email, user_pic from ev_users where id=?`
    // 调用sql
    db.query(sql, req.user.id, (err, result) => {
        if (err) return res.cc(err)

        if (result.length !==1) return res.cc('获取用户信息失败！')

       // 获取用户信息成功
       res.send({
           status: 0,
           message: '获取用户信息成功！',
           data: result[0]
       })
    })

    
}

// 更新用户信息的处理函数
exports.updateUserInfo = (req, res) => {
    // 执行更新的sql
    const sql = `update ev_users set ? where id=?`

    // 执行sql 并传递参数
    db.query(sql, [req.body, req.body.id], (err, result) => {
        if (err) return res.cc(err)

        if (result.affectedRows !== 1 ) return res.cc('更新用户的基本信息失败！')

        // 成功
        res.cc('更新用户信息成功', 0)
    })
}

// 重置密码的处理函数

exports.updatePassWord = (req,res) => {
    // 执行查询的sql
    const sql = `select * from ev_users where id=?`
   // 根据id 查询用户信息
   db.query(sql, req.user.id, (err, result) => {
       if ( err ) return res.cc(err)
       if (result.length !== 1 ) return res.cc('用户不存在！')

       // 判断用户输入的旧密码是否正确
       const compareResult = bcrypt.compareSync(req.body.oldPwd, result[0].password)
       if (!compareResult) return res.cc('输入原密码错误！')
       
       // 执行sql 更新密码
       const sql1 = `update ev_users set password=? where id=?`

       // 对新密码加密处理
       const newPassword = bcrypt.hashSync(req.body.newPwd, 10)

       // 更新密码 并返回成功处理
       db.query(sql1, [newPassword, req.user.id], (err, results) => {
           if (err) return res.cc(err)
           if ( results.affectedRows !== 1 ) return res.cc('更新密码失败！')

           res.cc('密码更新成功！', 0)
       })
   })
}


// 更新头像的处理函数
exports.updateAvatar = (req, res) => {
    const sql = `update ev_users set user_pic=? where id=?`

    db.query(sql, [req.body.avatar, req.user.id], (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1 ) return res.cc('更新头像失败！')

        res.cc('更新用户头像成功！', 0)
    })
}