// 导入验证规则包
const joi = require('joi')

// 验证分类名称  分类别名
const name = joi.string().required()
const alias = joi.string().alphanum().required()

// 删除文章分类的id校验规则
const id = joi.number().integer().min(1).required()

exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}

exports.delete_cate_schema = {
    params: {
        id
    }
}

exports.get_cate_schema = {
    params: {
        id
    }
}

exports.update_cate_schema = {
    body: {
        Id: id,
        name,
        alias
    }
}

