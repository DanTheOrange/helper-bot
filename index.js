require('dotenv').config()

const HelperBot = require('./src/helper-bot')

const DevMode = require('./src/middleware/dev-mode')
const DontReplyToSelf = require('./src/middleware/dont-reply-to-self')
const Blotto = require('./src/middleware/blotto') // blotto.js is the best js

bot = new HelperBot(process.env.DISCORD_BOT_TOKEN)

bot
  .use(new DevMode(['shitty-bots']))
  .use(new DontReplyToSelf())
  .use(new Blotto(['Banthro']))
  .start()
