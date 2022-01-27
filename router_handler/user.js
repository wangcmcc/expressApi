const db = require("../db/index")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { jwtSecretKey, expiresIn } = require('../json')

// 注册处理函数
exports.regUser = (req, res) => {
    // 获取客户端提交到服务器的表单数据
    const userInfo = req.body

    // 定义sql语句  查询用户名是否存在
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, userInfo.username, (err, result) => {
        if (err)  return res.cc(err) 
        // 长度大于0 说明数据库中存在
        if (result.length > 0)   return res.cc("用户名已存在！")
            
        // 用户名可用  需要对密码加密
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)

        // 执行插入的操作
        const sql = 'insert into ev_users set ?'

        // 执行sql
        db.query(sql, { username: userInfo.username, password: userInfo.password }, (err, result) => {
            if (err)  return res.cc(err)
            if (result.affectedRows !==1 )  return res.cc('注册用户失败，请稍后再试！')

            // 注册成功
            res.cc('注册成功！', 0)
        })
    })
}



// 登录处理函数
exports.login = (req, res) => {
    // 接收表单数据
    const userInfo = req.body

    // 查询sql
    const sql = 'select * from ev_users where username=?'

    // 执行sql
    db.query(sql, userInfo.username, (err, result) => {
        if (err) return res.cc(err)
        // sql执行成功 但是获取的数据条数不等于1
        if (result.length !== 1) return res.cc('登录失败！')

        // 判断密码是否正确
      const compareResult = bcrypt.compareSync(userInfo.password, result[0].password)
      if (!compareResult) return res.cc('密码错误, 登录失败！')

      // 生成token

      const user = { ...result[0], password: '', user_pic: '' }  // 剔除密码 头像信息

      // 对用户信息进行加密 生成token
      const tokenStr = jwt.sign(user, jwtSecretKey, { expiresIn })

      // 吊桶send 把token响应给客户端
      res.send({
          status: 0,
          message: '登录成功！',
          token: 'Bearer '+ tokenStr
      })
    })
}