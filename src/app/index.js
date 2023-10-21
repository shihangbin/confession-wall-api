const Koa = require('koa')
const cors = require('@koa/cors')
const { koaBody } = require('koa-body')
const { bodyParser } = require('@koa/bodyparser')
const automateRouters = require('../router')

// 创建app
const app = new Koa()

// 使用中间件
app.use(bodyParser())
app.use(cors())
app.use(koaBody())
automateRouters(app)

// 导出app
module.exports = app
