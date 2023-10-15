const { OPERATION_IS_NOT_ALLOWED } = require('../config/error.config')
const PermissionService = require('../service/permission.service')

const verifyPermission = async (ctx, next) => {
  // 获取登录的Id
  const { id } = ctx.user

  // 获取资源name/id
  // name => article/comment
  // params: { articleId: 11 }
  // KeyName => articleId
  const KeyName = Object.keys(ctx.params)[0]
  const resourceId = ctx.params[KeyName]
  const resourceName = KeyName.replace('Id', '')

  // 查询User的Id是否有修改权限
  const isPermission = await PermissionService.checkResource(
    resourceName,
    resourceId,
    id
  )
  if (!isPermission) {
    return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
  }

  await next()
}

module.exports = { verifyPermission }
