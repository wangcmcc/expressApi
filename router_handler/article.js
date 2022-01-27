const db = require('../db/index')
const path = require('path')
const { devNull } = require('os')


// 新增文章处理函数
exports.addArticle = (req, res) => {
    // 手动判断是否上传了文章封面
    if (!req.file || req.file.fieldname !== 'cover_img' ) return res.cc('文章封面是必选参数！')

    const articleInfo = {
        // 标题 内容 状态 所属的分类Id
        ...req.body,
        // 文章封面在服务器存放路径
        cover_img: path.join(__dirname, req.file.fieldname),
        // 文章发布时间\
        pub_date: new Date(),
        // 作者id
        author_id: req.user.id
    }

    // 发布文章的sql
    const sql = `insert into ev_articles set ?`
    db.query(sql, articleInfo, (err, result) => {
        if (err) return res.cc('err')
        if (result.affectedRows !== 1) return res.cc('文章发布失败！')
        res.cc('发布文章成功！', 0)

    })
}