const { Client } = require('discord.js')

class HelperBot {
  constructor (discordBotToken) {
    this.bot = new Client()
    this.botToken = discordBotToken
    this.middlewares = []

    this.start = this.start.bind(this)
    this.use = this.use.bind(this)
    this.voiceStateUpdate = this.voiceStateUpdate.bind(this)
    this.message = this.message.bind(this)

    this.bot.on('voiceStateUpdate', this.voiceStateUpdate)
    this.bot.on('message', this.message)
  }

  start () {
    this.bot.login(this.botToken)
  }

  use (middleware) {
    this.middlewares.push(middleware)
    return this
  }

  voiceStateUpdate () {
    let state
    this.middlewares.forEach(
      mw => mw.voiceStateUpdate && mw.voiceStateUpdate(msg, state)
    )
  }

  message (msg) {
    let state = {
      bot: this.bot
    }
    let shouldRun = true
    function kill () {
      shouldRun = false
    }
    this.middlewares.forEach(
      mw => shouldRun && mw.message && mw.message(msg, state, kill)
    )
  }
}

module.exports = HelperBot
