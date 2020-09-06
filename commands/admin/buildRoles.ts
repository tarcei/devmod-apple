import { Command } from '@types'

import config from '../../config'

import { red } from '../../utils/colors'

import {
  TextChannel,
} from 'discord.js'

const buildRoles: Command = {
  regex: /^buildroles\b/,
  usage: 'buildroles',
  description: 'Build the role picker.',
  permissions: ['MANAGE_ROLES'],

  // TODO: categorize assignable roles and split embeds manually

  async callback ({
    message,
    embed,
  }): Promise<void> {
    if (!config.channels?.roles) {
      await message.channel.send(embed({
        title: '`roles` channel not configured',
        color: red,
      }))

      return
    }

    await message.delete()

    const roleChannel = await message.guild.channels.resolve(config.channels.roles) as TextChannel

    const oldMessages = await roleChannel.messages.fetch({
      limit: 10,
    })

    for (const message of oldMessages.array()) {
      await message.delete()
    }

    for (const assignableEmbed of config.roles?.assignableEmbeds) {
      const roles = Object.entries(assignableEmbed.items)

      console.log(roles)

      const message = await roleChannel.send(embed({
        description: (assignableEmbed.description || '') + roles.map(([emoji, roleId]) => `${emoji} <@&${roleId}>`).join('\n'),
      }))

      for (const [emoji] of roles) {
        await message.react(emoji)
      }
    }
  },
}

export default buildRoles
