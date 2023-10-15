const KoaRouter = require('@koa/router')
const { signUser, test } = require('../controller/login.controller')
const { verifyLogin, verifyAuth } = require('../middleware/login.middleware')

const loginRouter = new KoaRouter({ prefix: '/login' })

loginRouter.post('/', verifyLogin, signUser)
loginRouter.get('/test', verifyAuth, test)

module.exports = loginRouter
