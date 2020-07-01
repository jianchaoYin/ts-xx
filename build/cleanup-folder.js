const fs = require('fs-extra')
const path = require('path')

const constants = require('./constants')
//当不为开发环境时,清空dist目录
if (constants.APP_ENV !== 'dev') {
    fs.emptyDirSync(path.join(__dirname, `../dist/${constants.APP_ENV}`))
}
