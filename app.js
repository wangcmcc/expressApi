const express = require('express')


const app = express()

const joi = require('joi')

// 处理跨域问题
const cors = require('cors')

// 解析token 中间件
const expressJWT = require('express-jwt')
// 生成token时的秘钥
const { jwtSecretKey } = require('./json')
app.use(cors())

// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))

// 解析表单数据中间件
app.use(express.urlencoded({ extended: false }))

// 在路由前 封装一个全局的cc函数

app.use((req, res, next) => {
    // status = 0成功   默认为1 失败
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }

    next ()
})

// 在注册路由值钱配置解析token的中间件
app.use(expressJWT({
    secret: jwtSecretKey
}).unless({ path: [/^\/api/] }))

const userRouter = require('./router/user')
const userInfoRouter = require('./router/userinfo')
const artCateRouter = require('./router/artcate')
const articleRouter = require('./router/article')

app.use('/api', userRouter)
app.use('/my', userInfoRouter)
app.use('/my/article', artCateRouter)
app.use('/my/article', articleRouter)

// 定义错误级别中间件
app.use((err, req, res, next) => {
    // 验证数据格式失败
    if (err instanceof joi.ValidationError) res.cc(err)
    
    // token 身份认证
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    // 其他错误
    res.cc(err)
})






app.listen(8888, () => {
    console.log('this server runing on http://127.0.0.1:8888')
})