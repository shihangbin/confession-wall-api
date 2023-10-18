const connection = require('../app/database')

class UploadService {
  async avatarUpload(url, userId) {
    console.log(url, userId)
    const statement = 'INSERT INTO `avatar` (url,user_id) VALUES (?,?)'
    const [result] = await connection.execute(statement, [url, userId])
    return result
  }
}

module.exports = new UploadService()
