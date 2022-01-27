const mysql = require('mysql')


// 创建连接数据库对象
const db = mysql.createPool({
    host: '39.105.115.164',
    user:  'root',
    password: 'xxxx',  // 自己修改
    database: 'manage'
})

module.exports = db