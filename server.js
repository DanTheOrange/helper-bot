require('dotenv').config()

const bot = new (require('discord.js').Client)()
const blotto = require('./lib/blotto') // blotto js is the best js
const fs = require('fs')

const pubgers = [
  'DanTheOrange',
  'Dan',
  'Ben',
  'Banthro',
  'Slyphor',
  'JoeyWonton',
  'Cuthbert Smilington',
  'Chompa666',
]

const aliases = {
  doggy:     'joeywonton',
  joey:      'joeywonton',
  joe:       'joeywonton',
  logan:     'joeywonton',
  bear:      'joeywonton',
  dave:      'slyphor',
  helperbot: 'helper-bot',
  helper:    'helper-bot',
  trotter:   'banthro',
  thirsty:   'banthro',
  plog:      'ben',
  jacob:     'cuthbert smilington',
  cuthbert:  'cuthbert smilington',
  cunt:      'cuthbert smilington',
  failure:   'cuthbert smilington',
  chris:     'chompa666',
}

function contains(string, array, wordMatch = false) {
  return array.some((term) => {
    const includes = string.toLowerCase().includes(term)
    if(wordMatch && includes && term.split().length > 0) {
      const regex = new RegExp('\\b'+term+'\\b', 'g')
      return !!string.toLowerCase().match(regex)
    }

    //default behaviour
    return includes
  });
}

// loops arguments and returns a random one
// each entry has equal chance unless a weight is specified
// 'hi' as an argument this will have 1/n chance
// [4, 'lol'] as an argument this will have 4/n chance
// oneOf('hi', [2, 'hello']) this has 1/3 chance of returning hi
//                           and a 2/3 chance of returning hello
function oneOf() {
  let args = [...arguments]
  let arr = []
  args.forEach((item) => {
    if(Array.isArray(item)) {
      arr = arr.concat(Array(item[0]).fill(item[1]))
    } else {
      arr.push(item)
    }
  })
  console.log(arr)
  return arr[Math.floor(Math.random() * arr.length)]
}

function PUBG(user, guild, config = {}, exclude = []) {
  const conf = Object.assign({}, {
    debug:   false,
    force:   false,
    emoji:   false,
    ben:     false,
    noBan:   false,
    channel: 'general',
  }, config)

  let message = [user.username + ' would like to know if']
  let count   = 0

  pubgers.forEach(player => {
    let playerModel = bot.users.find('username', player)
    if(player !== user.username && !exclude.includes(player) && (guild.presences.has(playerModel.id) && guild.presences.get(playerModel.id).status === 'online' || conf.force || (player === 'Ben' && conf.ben))) {
      message.push('<@' + playerModel.id + '>')
      if(player === 'Ben' && conf.ben) {
        message.push('(stop playing wow!)')
        playerModel.send('STOP PLAYING WOW!!! Play PUBG :D')
      }
      count++
    }
  })

  if(bot.channels.find('name', 'PUBG').members.length === 4) {
    message[0] = 'HAHAHAH, there is already four!'
    message.push('can do one!')
  } else {
    message.push('wants to play PUBG?');
  }

  if(!conf.emoji) message.push(':rooster: :airplane: :family_mwbb:')

  if(count && !conf.debug) {
    const channel = bot.channels.find('name', conf.channel)
    channel.send(message.join(' '))
  } else {
    console.log(message)
  }
}

bot.on('ready', () => {
  console.log('Ready!')
  //bot.channels.find('name', 'general').send('Yes, they don\'t need you...')
  //console.log(bot.users.random())
})

bot.on('voiceStateUpdate', (oldUser, newUser) => {
  const channel    = bot.channels.find('id', newUser.voiceChannelID)
  const oldChannel = oldUser && oldUser.voiceChannelID && bot.channels.find('id', oldUser.voiceChannelID)
  const user       = newUser.user

  // Don't do anything if the old channel is PUBG,
  // that means they're unmuting or something
  if (oldChannel && oldChannel.name === 'PUBG') return

  if(channel && channel.name) {
    switch(channel.name) {
      case 'PUBG':
        let exclude = []
        channel.members.forEach((member) => {
          exclude.push(member.user.username)
        })
        PUBG(user, newUser.guild, {}, exclude)
        break;
      case 'MSN Notification':
      case 'Divinity: Original Sin 2':
      default:
        // bot.channels.find('name', 'general').send(user.username + ', You appear to have joined the wrong channel, would you like to join PUBG instead?')
        break;
    }
  }
})

bot.on('message', (msg) => {
  console.log(msg)
  if(msg.author.bot && msg.author.username !== 'helper-bot' && Math.random() >= 0.7) {
     msg.reply('sorry, I don\'t like helping other bots');
  } else {

    if(msg.author.username == 'DanTheOrange' && msg.content === '/reset stupid') {
      fs.writeFileSync('.data/StupidCounter', 0)
    }

    if(!msg.author.bot && (msg.content.toLowerCase().includes('ben') || msg.content.toLowerCase().includes('banthro')) && contains(msg.content, ['stupid', 'idiot', 'silly', 'damn it'])) {
      if (!fs.existsSync('.data/StupidCounter')) {
        fs.writeFileSync('.data/StupidCounter', 0)
      }

      const dude = bot.users.find('username', 'Banthro')
      let times = fs.readFileSync('.data/StupidCounter').toString()
      times++

      msg.channel.send([
        oneOf('Got it,', 'You\'re the boss,', 'Okay,', 'Roger,', 'Understood,', 'Well,'),
        oneOf(dude + ' has been stupid', 'incrementing the stupid counter for ' + dude + ' to', 'unsurprisingly ' + dude + '\'s stupid counter has got to'),
        times,
        oneOf([4, 'times.'], 'times!'),
      ].join(' '))

      fs.writeFileSync('.data/StupidCounter', times)
    }

    if(msg.channel.type === 'dm' && !msg.author.bot) {
      const recipient = bot.users.find('username', 'DanTheOrange')
      recipient.send(msg.author.username + ' said: ' + msg.content)
    }

    if(msg.author.username === 'Banthro') {
      if(msg.channel.name === 'dans-meme-channel' && Math.random() >= 0.9) {
        msg.reply('why are you talking in here?')
      }
      if(contains(msg.content, blotto, true)) {
        msg.reply(oneOf(
         'I\'m not surprised...',
         'again?',
         'on the booze again?',
        ))
      } else if(msg.content.endsWith('?')) {
        msg.channel.send(msg.content.split(' ').map((word) => {
          return word.split('').map((letter, index) => {
            return (index % 2 === 0) ? letter.toUpperCase() : letter;
          }).join('')
        }).join(' '))
      } else if(Math.random() >= 0.995) {
        msg.reply(oneOf(
          [4, 'damn it!'],
          '[analysing message content for future judgement]',
        ))
      }
    }

    if(msg.content.toLowerCase().includes('microsoft')) {
      msg.reply('scum!')
    }

    if(msg.author.username !== 'helper-bot' && contains(msg.content, ['damn it', 'darn it', 'nice one', 'fuck you', 'fuck off', 'fuck yourself', 'say bye', 'play pubg', 'do it', 'do one', 'hurry up', 'good game'])) {
      let message = msg.content.split(' ')
      let response = ''
      let prefix = 'Yeah!'
      let negative

      message.some((word, index) => {
        if(contains(word, ['damn', 'darn', 'nice', 'fuck', 'play', 'do', 'hurry', 'good'])) {
          message.splice(0, index)
          negative = contains(word, ['damn', 'darn', 'fuck']) || (word === 'do' && message[1] === 'one')
          response = word.charAt(0).toUpperCase() + word.slice(1) + ' ' + message[1]
          return true
        }
      })

      if(message[2]) {
        if('.?!'.includes(message[2][message[2].length -1])) {
          message[2] = message[2].slice(0, -1)
        }

        if(aliases[message[2]]) {
          message[2] = aliases[message[2]]
        }

        switch(message[2]) {
          case 'me':
          case 'i':
            message[2] = msg.author.username
            break;
          case 'everyone':
            if(negative) {
              message[2] = msg.author.username
              prefix = 'No!'
            } else {
              message[2] = '@everyone'
            }
            console.log('yay')
            break;
          case 'dantheorange':
            if(negative) {
              prefix = 'No!'
              response = 'You are perfect'
            }
            break;
          case 'dan':
            if(negative && msg.author.username !== 'DanTheOrange') {
              prefix = 'Eh...'
              response = 'I\'m sure you\'re okay'
            }
            break;
          case 'helper-bot':
            if(negative && msg.author.username === 'Banthro') {
              prefix = 'No!'
              message[2] = msg.author.username
              if(message[1] === 'off') {
                response = 'You ' + response
              }
            }
            if(message[1] === 'bye') {
              prefix = false
              response = 'Bye'
            }
            break;
        }

        let damnIt = bot.users.find((user) => {
          return user.username.toLowerCase() === message[2].toLowerCase() ? true : false
        })

        if(!damnIt) damnIt = message[2]

        if(damnIt) {
          const sentence = [
            response,
            damnIt,
          ]

          prefix && sentence.unshift(prefix)
          msg.channel.send(sentence.join(' '))
        }
      }
    }

    if(msg.content === '/lazy') {
      msg.reply('is very lazy')
    }

    if(msg.content === '/approve') {
      msg.reply('ᶘ ◕ᴥ◕ᶅ,b  I approve')
    }

    if(msg.content === '/help') {
      msg.reply('maybe <@' + bot.users.random().id + '> can help you?')
    }

    if(msg.content.toLowerCase().startsWith('/get')) {
      const options = msg.content.split(' ')
      options.shift()
      const user = bot.users.find((person) => {
        return person.username.toLowerCase() === options[0].toLowerCase() ? true : false
      })

      const times = options[1] || 5
      const interval = options[2] || 1000

      let i

      for(i = times; i > 0; i--) {
        setTimeout(() => {
          bot.channels.find('name', 'general').send(`${user}, you are wanted!`)
        }, interval * i)
      }
    }

    if(msg.content.toLowerCase().startsWith('/message')) {
      const options = msg.content.split(' ')
      options.shift()

      const dude = bot.users.find('username', options[0])

      options.shift()
      options.join(' ')

      dude.send(options)
    }

    if(msg.content.toLowerCase().startsWith('/cage')) {
      const options = msg.content.split(' ')
      options.shift()

      const dude = bot.users.find('username', options[0])
      dude.sendMessage('hi')
      console.log(dude)
    }

    if(msg.content.toLowerCase().startsWith('chicken dinner')) {
      PUBG(msg.author, msg.guild)
    }

    if(msg.content.toLowerCase().startsWith('/pubg')) {
      const options = msg.content.split(' ')
      options.shift()

      const config = {
        debug:   options.includes('-d'),
        force:   options.includes('-f'),
        emoji:   options.includes('-e'),
        ben:     options.includes('-b'),
        noBan:   options.includes('--banthro-sucks'),
        channel: msg.channel.name
      }

      PUBG(msg.author, msg.guild, config)
    }
  }
})

bot.login(process.env.DISCORD_BOT_TOKEN)
