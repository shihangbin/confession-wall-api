const KoaRouter = require('@koa/router')
const {
  getLike,
  getUserLike,
  delLike,
  postLike,
} = require('../controller/like.controller')
const { verifyAuth } = require('../middleware/login.middleware')

const likeRouter = new KoaRouter({ prefix: '/like' })

likeRouter.get('/', getLike)
likeRouter.get('/user', getUserLike)
likeRouter.post('/', verifyAuth, postLike)
likeRouter.delete('/:likeId', verifyAuth, delLike)

module.exports = likeRouter
