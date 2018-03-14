class Responder {
  constructor({ command, response }) {
    this.response = response
    this.message = this.message.bind(this)

    const regexMatcher = (str) => str.match(command)
    const stringMatcher = (str) => str.startsWith(command)
    const noMatcher = () => false

    this.matcher = command instanceof RegExp ? regexMatcher
      : typeof command === 'string' ? stringMatcher
        : noMatcher
  }

  message(msg, state, kill) {
    if (this.matcher(msg.content)) {
      if (typeof this.response === 'function') {
        this.response(msg)
      } else {
        msg.reply(this.response)
      }
    }
  }
}

module.exports = Responder
