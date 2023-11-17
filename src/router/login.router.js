const KoaRouter = require('@koa/router')
const { signUser, user, wxLogin } = require('../controller/login.controller')
const { verifyLogin, verifyAuth } = require('../middleware/login.middleware')

const loginRouter = new KoaRouter({ prefix: '/login' })

loginRouter.post('/', verifyLogin, signUser)
loginRouter.get('/user', verifyAuth, user)
loginRouter.post('/wx', wxLogin)

module.exports = loginRouter
