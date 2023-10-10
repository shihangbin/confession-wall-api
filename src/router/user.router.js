const KoaRouter = require('@koa/router')

// 创建路由
const userRouter = new KoaRouter({ prefix: '/users' })

// 定义路由中映射
userRouter.get('/list', (ctx, next) => {
  ctx.body = 'users list'
})

// 导出路由
module.exports = userRouter
