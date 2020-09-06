import { Command } from '@types'

import config from '../../config'

import {
  TextChannel,
} from 'discord.js'

import {
  red,
} from '../../utils/colors'

const ping: Command = {
  regex: /^(unmute|unsilence)\s/,
  usage: 'unmute <userID> <reason>',
  description: 'Unmutes a user.',
  permissions: ['MANAGE_MESSAGES'],

  async callback ({ 
    message, 
    embed, 
    args,
  }): Promise<void> {
    if (!config.roles.muted) {
      message.channel.send(embed({
        title: '`muted` role not configured.',
        color: red,
      }))

      return
    }

    const [userId, ...restArgs] = args

    const reason = restArgs.join(' ')

    const member = await message.guild.members.fetch(userId.replace(/<@!([0-9]+)>/, '$1'))

    const { user } = member

    const name = `${user.tag} (${user.id})`

    const reasonString = reason
      ? ` for \`${reason}\`.`
      : `.`

    message.delete().catch(console.error)

    try {
      await member.roles.remove(config.roles.muted)

      const logChannel = await message.guild.channels.resolve(config.logChannelId) as TextChannel

      await logChannel.send(embed({
        title: 'Unmute',
        description: `Member has been unmuted${reasonString}`,
        
        footer: {
          "icon_url": user.avatarURL(),
          text: name,
        },
      }))
    } catch (error) {
      await message.channel.send(embed({
        title: 'Failed to unmute member.',
        color: red,
        
        footer: {
          "icon_url": user.avatarURL(),
          text: name,
        },
      }))

      throw error
    }
  },
}

export default ping
