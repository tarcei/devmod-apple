import {
  MessageReaction,
  GuildMember,
} from 'discord.js'

import config from '../config'

export default async (reaction: MessageReaction, member: GuildMember): Promise<void> => {
  if (!config.channels.roles || reaction.message.channel.id !== config.channels.roles) return

  await member.roles.remove(config.roles.assignable[reaction.emoji.name])
}
