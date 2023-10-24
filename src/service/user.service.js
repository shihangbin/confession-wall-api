const connection = require('../app/database')

class UserService {
  // 创建用户
  async createUser(user) {
    const { username, password } = user
    // 拼接statement
    const statement = 'INSERT INTO `users` (username, password) VALUES(?, ?);'

    // 执行SQL
    const [result] = await connection.execute(statement, [username, password])
    return result
  }
  // 查询用户名
  async findUserByName(username) {
    const statement = 'SELECT * FROM users WHERE username = ?'
    const [values] = await connection.execute(statement, [username])
    return values
  }

  async avatarURL(url, userId) {
    const statement = 'UPDATE users SET avatar_path = ? WHERE id = ?;'
    const [result] = await connection.execute(statement, [url, userId])
    return result
  }
}
module.exports = new UserService()
