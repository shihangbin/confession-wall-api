const fs = require('fs')
const path = require('path')
const { AVATAR_URL, CLIENT_OSS } = require('../config/path')
const { upDate } = require('../utils/formatDate')

const upload = async (filepath, fileName, mimetype, file = 'avatar') => {
  const headers = {
    'Content-Type': mimetype,
  }

  try {
    const stream = fs.createReadStream(filepath)
    let result = await CLIENT_OSS.putStream(
      `/school-wall/${file}/${upDate()}/${fileName}`,
      stream,
      { headers }
    )
    return `${AVATAR_URL}${result.name}`
  } catch (e) {
    console.log(e)
  }
}

module.exports = { upload }
