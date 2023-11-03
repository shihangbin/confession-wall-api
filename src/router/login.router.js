const KoaRouter = require('@koa/router')
const { signUser, user } = require('../controller/login.controller')
const { verifyLogin, verifyAuth } = require('../middleware/login.middleware')

const loginRouter = new KoaRouter({ prefix: '/login' })

loginRouter.post('/', verifyLogin, signUser)
loginRouter.get('/user', verifyAuth, user)

module.exports = loginRouter
