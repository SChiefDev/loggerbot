const cacheGuild = require('../utils/cacheGuild')
const { displayUser } = require('../utils/constants')
const { deleteGuild } = require('../../db/interfaces/postgres/delete')
const { createGuild } = require('../../db/interfaces/postgres/create')

module.exports = {
  func: async message => {
    const msg = await message.channel.createMessage({
      embeds: [{
        description: `Are you absolutely sure, ${displayUser(message.author)} (${message.author.id})? Reply *yes* if so.`,
        color: 3553599,
        timestamp: new Date(),
        footer: {
          icon_url: global.bot.user.avatarURL,
          text: displayUser(global.bot.user)
        },
        author: {
          name: displayUser(message.author),
          icon_url: message.author.avatarURL
        }
      }]
    })
    let i = 0
    let complete = false
    global.bot.on('messageCreate', async function temp(m) {
      if (i === 0) {
        setTimeout(() => {
          global.bot.removeListener('messageCreate', temp)
          if (!complete) {
            message.channel.createMessage({
              embeds: [{
                description: 'You didn\'t reply with *yes* within 10 seconds.',
                color: 3553599,
                timestamp: new Date(),
                footer: {
                  icon_url: global.bot.user.avatarURL,
                  text: displayUser(global.bot.user)
                },
                author: {
                  name: displayUser(message.author),
                  icon_url: message.author.avatarURL
                }
              }]
            })
            msg.delete()
          }
        }, 10000)
      }
      if (m.channel.id === message.channel.id && m.author.id === message.author.id && m.content.toLowerCase() === 'yes' && !complete) {
        message.channel.createMessage({
          embeds: [{
            description: 'Alright, resetting guild settings.',
            color: 3553599,
            timestamp: new Date(),
            footer: {
              icon_url: global.bot.user.avatarURL,
              text: displayUser(global.bot.user)
            },
            author: {
              name: displayUser(message.author),
              icon_url: message.author.avatarURL
            }
          }]
        })
        complete = true
        await deleteGuild(message.channel.guild.id)
        await createGuild(message.channel.guild)
        await cacheGuild(message.channel.guild.id)
        return
      }
      i = i + 1
    })
  },
  name: 'reset',
  quickHelp: 'Completely resets my stored settings for your server. If you want to undo or otherwise disable Logger logging in the server, this is the command.',
  examples: `\`${process.env.GLOBAL_BOT_PREFIX}reset\` <- asks for confirmation (say "yes") before clearing logging settings for the server.`,
  type: 'admin',
  category: 'Administration'
}
