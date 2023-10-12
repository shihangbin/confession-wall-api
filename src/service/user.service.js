const connection = require('../app/database')

class userService {
  async create(user) {
    console.log('数据库操作成功')
    // console.log(user)
    const { username, userpassword } = user

    // 拼接statement
    const statement =
      'INSERT INTO `users` (username,userpassword) VALUES(?, ?);'

    // 执行SQL
    const result = await connection.execute(statement, [username, userpassword])
  }
}
module.exports = new userService()
