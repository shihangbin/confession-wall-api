const dayjs = require('dayjs')

const upDate = (date = new Date(), format = 'YYYY/MM/DD') => {
  return dayjs(date).format(format)
}

module.exports = { upDate }
