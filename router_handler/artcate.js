const db = require("../db/index")

// 获取文章分类
exports.getArticleCates = (req, res) => {

    // 查询文章分类sql
    const sql = `select * from ev_article_cate where is_delete =0 order by id asc`

    db.query(sql, (err, result) => {
         if (err) return res.cc(err)
         res.send({
             status: 0,
             message: '获取文章分类列表成功！',
             data: result
         })
    })
}

// 新增文章分类
exports.addArticleCates = (req,res) => {
    // 定义查询sql
    const sql = `select * from ev_article_cate where name=? or alias=?`
    // 执行查询
    db.query(sql, [req.body.name, req.body.alias], (err, result) => {
        if ( err ) return res.cc(err)

        // 分类名称和别名都被占用
        if (result.length ===2 ) return res.cc('分类名称和别名都被占用， 请更换后再试！')
        if (result.length ===1 && result[0].name ===req.body.name && result[0].alias === req.body.alias ) return res.cc('分类名称和别名都被占用， 请更换后再试！')  
        // 分类名称 或者分类别名被占用
        if (result.length ===1 && result[0].name ===req.body.name) return res.cc('分类名称被占用，请更换分类名称在操作！')
        if (result.length ===1 && result[0].alias ===req.body.alias) return res.cc('分类别名被占用，请更换分类别名在操作！')

        const addSql = `insert into ev_article_cate set ?`
        db.query(addSql, req.body, (err, results) => {
             if ( err ) return res.cc(err)

             if (results.affectedRows !==1 ) return res.cc('新增文章分类失败！')

             res.cc('新增文章分类成功！', 0)
        })
    })
}

// 删除文章分类的处理函数
exports.deleteCateById = (req, res) => {
    // 删除其实就是标记is_delete = 1
    const sql = `update ev_article_cate set is_delete=1 where id=?`

    db.query(sql, req.params.id, (err, result) => {
        if (err) return res.cc(err)

        if (result.affectedRows !== 1) return res.cc('删除文章分类失败！')

        res.cc('删除文章分类成功！', 0)
    })
}

// 根据文章id 获取文章信息处理函数
exports.getArtCateById = (req, res) => {
    const sql = 'select * from ev_article_cate where is_delete=0 and id=?'

    db.query(sql, req.params.id, (err, result) => {
        if (err) return res.cc(err)
        if (result.length !== 1) return res.cc('获取文章信息失败！')

        res.send({
            status: 0,
            message: '获取文章信息成功!',
            data: result[0]
        })
    })
}

// 根据文章id 更新文章分类处理删除
exports.updateCateById = (req, res) => {
    // 查询分类名称和别名是否被占用
    const sql = `select * from ev_article_cate where Id<>? and (name=? or alias=?)`

    // 执行查询操作
    db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, result) => {
        if (err) return res.cc(err)

        // 分类名称和分类别名都被占用
        if (result.length ===2 ) return res.cc('分类名称和别名都被占用！')

        if (result.length ===1 && result[0].name === req.body.name && result[0].alias ===req.body.alias) return res.cc('分类名称和分类别名都被占用！')
        // 分类名称或分类别名被占用
        if (result.length ===1 && result[0].name === req.body.name) return res.cc('分类名称被占用！')
        if (result.length ===1 && result[0].alias === req.body.alias) return res.cc('分类别名被占用')

        const sql1 = `update ev_article_cate set ? where id=?`
        db.query(sql1, [req.body, req.body.Id], (err, results) => {
            if (err) return res.cc(err)

            if (results.affectedRows !==1 ) return res.cc('文章分类更新失败！')

            res.cc('文章分类更新成功！', 0)
        })
    })
}



