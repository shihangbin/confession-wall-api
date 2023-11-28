const KoaRouter = require('@koa/router')
const {
  getLike,
  getUserLike,
  delLike,
  postLike,
  getLikeList,
} = require('../controller/like.controller')
const { verifyAuth } = require('../middleware/login.middleware')

const likeRouter = new KoaRouter({ prefix: '/like' })

likeRouter.get('/', getLike)
likeRouter.get('/user', getUserLike)
likeRouter.get('/list', getLikeList)
likeRouter.post('/', verifyAuth, postLike)
likeRouter.delete('/:likeId', verifyAuth, delLike)

module.exports = likeRouter
