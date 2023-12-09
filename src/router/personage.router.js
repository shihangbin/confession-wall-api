const KoaRouter = require('@koa/router')
const { verifyLogin, verifyAuth } = require('../middleware/login.middleware')
const { getLike, getArticle } = require('../controller/personage.controller')

const personageRouter = new KoaRouter({ prefix: '/personage' })

personageRouter.get('/like', verifyAuth, getLike)
personageRouter.get('/article', verifyAuth, getArticle)

module.exports = personageRouter
