const fs = require('fs')
const path = require('path')

// 解析指定目录下图片
const parserDir = (dir, ret) => {
    const files = fs.readdirSync(dir)
    // TODO 是否需要排序
    files.forEach((itm, idx) => {
        const stat = fs.statSync(dir + path.sep + itm);
        if (stat.isDirectory()) {
            parserDir(dir + path.sep + itm, ret)
        } else {
            if (itm.endsWith('.png') || itm.endsWith('.jpg') || itm.endsWith('.jpeg')) {
                ret.push({ path: dir + path.sep + itm, name: itm })
            }
        }
    })
}

exports.parserDir = parserDir