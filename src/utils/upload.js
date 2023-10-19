const fs = require('fs')
const { AVATAR_URL, CLIENT_OSS } = require('../config/path')
const { upDate } = require('../utils/formatDate')

const upload = async (fileName, filePath, file = 'avatar') => {
  try {
    let stream = fs.createReadStream(`${fileName}/${filePath}`)
    let result = await CLIENT_OSS.putStream(
      `school-wall/${file}/${upDate()}/${filePath}`,
      stream
    )
    // console.log(`${AVATAR_URL}${result.name}`)
    return `${AVATAR_URL}${result.name}`
  } catch (e) {
    console.log(e)
  }
}

module.exports = { upload }
