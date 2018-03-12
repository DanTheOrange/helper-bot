class DontReplyToSelf {
  message(msg, state, kill) {
    if(msg.author.username === state.bot.user.username) {
      kill()
    }
  }
}

module.exports = DontReplyToSelf
