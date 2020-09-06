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

  async callback ({
    message,
    embed,
  }): Promise<void> {
    if (!config.channels.roles) {
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

    const assignableRoleGroups = Object.entries(config.roles.assignable)
      .reduce((acc: string[][][], value, index) => {
        const newIndex = Math.floor(index / 15)
        if (!acc[newIndex]) acc[newIndex] = []

        acc[newIndex].push(value)

        return acc
      }, [])

    for (const index in assignableRoleGroups) {
      const group = assignableRoleGroups[index]
      
      const message = index === '0' ? await roleChannel.send(embed({
        title: 'Self Assignable Roles',
        description: `Roles that have the word "Helper" are **pingable** and meant for if you want to help once pinged.` 
          + `The non "Helper" roles are for the field you mainly dev in and have a special color.\n\n`
          + group.map(([emoji, roleId]) => `${emoji} <@&${roleId}>`).join('\n'),
      })) : await roleChannel.send(embed({
        description: group.map(([emoji, roleId]) => `${emoji} <@&${roleId}>`).join('\n'),
      }))

      for (const [emoji] of group) {
        await message.react(emoji)
      }
    }
  },
}

export default buildRoles
