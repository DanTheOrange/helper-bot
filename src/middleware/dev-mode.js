class DevMode {
  constructor(devChannels) {
    this.devChannels = devChannels
    this.message = this.message.bind(this)
  }

  message(msg, state, kill) {
    if(this.devChannels.includes(msg.channel.name)) {
      state.devMode = true
    }
  }
}

module.exports = DevMode
