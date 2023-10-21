const fs = require('fs')
const path = require('path')
const { AVATAR_URL, CLIENT_OSS } = require('../config/path')
const { upDate } = require('../utils/formatDate')

const upload = async (destination, fileName, mimetype, file = 'avatar') => {
  const headers = {
    'Content-Type': mimetype,
  }

  try {
    let stream = fs.createReadStream(`${destination}/${fileName}`)
    let result = await CLIENT_OSS.putStream(
      `school-wall/${file}/${upDate()}/${fileName}`,
      stream,
      { headers }
    )
    // console.log(result)
    // let result = await CLIENT_OSS.put(
    //   `school-wall/${file}/${upDate()}/${fileName}`,
    //   path.normalize(`${destination}/${fileName}`),
    //   { headers }
    // )
    // const result = await CLIENT_OSS.put(
    //   `school-wall/${file}/${upDate()}/${fileName}`,
    //   new Buffer.from(`${destination}/${fileName}`),
    //   { headers }
    // )
    // console.log(`${AVATAR_URL}${result.name}`)
    return `${AVATAR_URL}${result.name}`
  } catch (e) {
    console.log(e)
  }
}

module.exports = { upload }
