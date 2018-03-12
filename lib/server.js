const micro = require('micro')

const server = micro(async (req, res) => {
  return { status: 'online' }
})

server.listen(3000)

module.exports = server