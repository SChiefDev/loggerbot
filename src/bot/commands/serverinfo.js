module.exports = {
  func: async message => {
    const fields = []
    const embed = {
      description: `Information about ${message.channel.guild.name}`,
      timestamp: new Date(),
      color: 319403,
      fields: [{
        name: 'Name',
        value: `**${message.channel.guild.name}** (${message.channel.guild.id})`
      }, {
        name: 'Verification Level',
        value: `${message.channel.guild.verificationLevel}`
      }, {
        name: 'Owner',
        value: `<@${message.channel.guild.ownerID}>`
      }, {
        name: 'Features',
        value: message.channel.guild.features.length !== 0 ? message.channel.guild.features.join(', ') : 'No Guild Features'
      }, {
        name: 'Channels',
        value: `**${message.channel.guild.channels.size}** total\n**${message.channel.guild.channels.filter(c => c.type === 0).length}** text\n**${message.channel.guild.channels.filter(c => c.type === 2).length}** voice\n**${message.channel.guild.channels.filter(c => c.type === 4).length}** categories`
      }, {
        name: 'Region',
        value: `**${message.channel.guild.region}**`
      }, {
        name: 'Role Count',
        value: `${message.channel.guild.roles.size}`
      }]
    }
    if (message.channel.guild.iconURL) {
      embed.thumbnail = {
        url: message.channel.guild.iconURL
      }
    }
    if (message.channel.guild.emojis.length === 0) {
      fields.push({
        name: 'Emojis',
        value: 'None'
      })
    } else {
      const emojiObj = {
        0: []
      }
      let counter = 0 // Dynamically create embed fields based on character count
      message.channel.guild.emojis.forEach(emoji => {
        if (emojiObj[counter].join('\n').length < 950) {
          emojiObj[counter].push(`<:${emoji.name}:${emoji.id}>`)
        } else {
          counter++
          emojiObj[counter] = []
          emojiObj[counter].push(`<:${emoji.name}:${emoji.id}>`)
        }
      })
      Object.keys(emojiObj).forEach(key => {
        fields.push({
          name: 'Emojis',
          value: emojiObj[key].join('\n')
        })
      })
    }
    embed.fields = embed.fields.concat(fields)
    await message.channel.createMessage({ embed: embed })
  },
  name: 'serverinfo',
  quickHelp: 'Get information about the server this command is used in.',
  examples: `\`${process.env.GLOBAL_BOT_PREFIX}serverinfo\` <- returns an embed with member count, features, and emojis of the server used in.`,
  type: 'any',
  category: 'Utility'
}
