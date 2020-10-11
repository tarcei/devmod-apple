import { Command } from '@types'
import * as fs from 'fs'

import {
  DMChannel,
  Message,
  NewsChannel,
  TextChannel,
} from 'discord.js'

const buildRoles: Command = {
  regex: /^archive\b/,
  usage: 'archive',
  description: 'archives the current channel into a markdown file',
  permissions: ['ADMINISTRATOR'],

  async callback({
    message,
    embed,
  }): Promise<void> {
    const currentChannel = message.channel

    const msgs = await getMessages(currentChannel, message, [])
    const time = new Date().getTime()
    for (const msg of msgs) {
      const created = new Date(msg.createdTimestamp)
      fs.appendFileSync(`./archives/${currentChannel.id}-${time}.md`, `**${msg.author.username}** [${created.toUTCString()}]: ${msg.cleanContent}\n\n`)
    }

    await message.channel.send(embed({
      title: 'Archive',
      description: 'Archived the current channel.',
    }))

  },
}

const getMessages = async (channel: (TextChannel | DMChannel | NewsChannel), lastMessage: Message, pastMessages: Message[]) => {

  const msgs = await channel.messages.fetch({
    before: lastMessage.id,
    limit: 100,
  })

  if (Array.from(msgs.values()).length === 0)
    return pastMessages

  pastMessages.push(...Array.from(msgs.values()))

  return await getMessages(channel, msgs.last(), pastMessages)

}

export default buildRoles
