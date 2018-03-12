const terms = require('./terms')
const { contains, oneOf } = require('../../utils')

class Blotto {
  constructor (alcoholics) {
    this.alcoholics = alcoholics
    this.message = this.message.bind(this)
  }

  message(msg, state) {
    const alcoholics = Object.assign([], this.alcoholics)

    if(state.devMode) {
      alcoholics.push(msg.author.username)
    }

    if(alcoholics.includes(msg.author.username) && contains(msg.content, terms, true)) {
      msg.reply(oneOf(
       'I\'m not surprised...',
       'again?',
       'on the booze again?',
      ))
    }
  }
}

module.exports = Blotto
