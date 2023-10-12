const connection = require('../app/database')

class userService {
  async create(user) {
    const { username, userpassword } = user

    // 拼接statement
    const statement =
      'INSERT INTO `users` (username,userpassword) VALUES(?, ?);'

    // 执行SQL
    const [result] = await connection.execute(statement, [
      username,
      userpassword,
    ])
    console.log('数据库操作成功')
    return result
  }
  async findUserByName(username) {
    const statement = 'SELECT * FROM users WHERE username = ?'

    const [values] = await connection.execute(statement, [username])
    return values
  }
}
module.exports = new userService()
