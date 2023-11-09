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

  async userId(id) {
    const statement = 'SELECT * FROM users WHERE id = ?'
    const [values] = await connection.execute(statement, [id])
    return values
  }

  async putUserInfo(
    username,
    password,
    avatar_path,
    nickname,
    age,
    role,
    is_muted,
    wechat_or_qq,
    gender,
    major,
    school_class,
    say,
    id
  ) {
    username = username === undefined ? null : username
    password = password === undefined ? null : password
    avatar_path = avatar_path === undefined ? null : avatar_path
    nickname = nickname === undefined ? null : nickname
    age = age === undefined ? null : age
    role = role === undefined ? null : role
    is_muted = is_muted === undefined ? null : is_muted
    wechat_or_qq = wechat_or_qq === undefined ? null : wechat_or_qq
    gender = gender === undefined ? null : gender
    major = major === undefined ? null : major
    school_class = school_class === undefined ? null : school_class
    say = say === undefined ? null : say

    const statement = `
    UPDATE users 
    SET 
      username = COALESCE(?, username ),
      password = COALESCE(?, password ),
      avatar_path = COALESCE(?, avatar_path ),
      nickname = COALESCE(?, nickname ),
      age = COALESCE(?, age ),
      role = COALESCE(?, role ),
      is_muted = COALESCE(?, is_muted ),
      wechat_or_qq = COALESCE(?, wechat_or_qq ),
      gender = COALESCE(?, gender ),
      major = COALESCE(?, major ),
      school_class = COALESCE(?, school_class ),
      say = COALESCE(?, say ) 
    WHERE id = ?;
    `
    try {
      const [result] = await connection.execute(statement, [
        username,
        password,
        avatar_path,
        nickname,
        age,
        role,
        is_muted,
        wechat_or_qq,
        gender,
        major,
        school_class,
        say,
        id,
      ])
      return result
    } catch (error) {
      // 处理错误，例如记录日志或返回错误信息
      console.error('SQL error:', error)
      throw new Error('An error occurred while executing the SQL statement.')
    }
  }
}
module.exports = new UserService()
