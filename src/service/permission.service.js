const connection = require('../app/database')

class PermissionService {
  async checkResource(resourceName, resourceId, userId) {
    const statement = `SELECT * FROM ${resourceName}s WHERE id = ? AND author_id = ?;`
    const [result] = await connection.execute(statement, [resourceId, userId])
    return !!result.length
  }
}

module.exports = new PermissionService()
