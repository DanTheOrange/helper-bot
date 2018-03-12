bot = new HelperBot()

bot
  .use(new DontReplyToSelf()) // this will exit
  .use(new Blotto())

bot.start()

class DontReplyToSelf {
  message(msg, state, next) {

  }
}

class PUBG {
  constructor() {
    this.pubgers = [

    ]
  }
}

class Blotto {
  alcoholics = [
    'Banthro'
  ]

  voiceStateChange( ) {
  }

  message(msg, state, next) {
    if(msg.author === 'Banthro') {
      // Bens alcoholism function
    } else {
      next()
    }
  }
}


class HelperBot {
    state = {}
    middlewares = []

    constructor () {
      const bot = new Discord()
      bot.on('message', this.message.bind(this))
      bot.on('voiceStateChange', this.voiceStateChange.bind(this))
    }

    use (middleware) {
        this.middlewares.push(middleware)
    }

    voiceStateChange () {
        this.state = {}
        this.middlewares.forEach(
          mw => mw.voiceStateChange && mw.voiceStateChange(msg, state, next)
        )
    }

    message (msg) {
        this.state = {}
        this.middlewares.forEach(
          mw => mw.message && mw.message(msg, state, next)
        )
    }
}

https://gist.github.com/unbug/dd596d79b5eace7d245f0a4db6cd2be5
