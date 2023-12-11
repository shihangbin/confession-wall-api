const KoaRouter = require('@koa/router')
const { getLike, getArticle } = require('../controller/personage.controller')

const personageRouter = new KoaRouter({ prefix: '/personage' })

personageRouter.get('/like/:userId', getLike)
personageRouter.get('/article/:userId', getArticle)

module.exports = personageRouter
