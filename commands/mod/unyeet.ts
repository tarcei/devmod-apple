import { Command } from '@types'
import config from '../../config'
import { red } from '../../utils/colors'
import { 
  TextChannel,
} from 'discord.js'
// import { channels.log } from '@config'

const yeet: Command = {
  regex: /^(unyeet|unban)\s/,
  usage: 'unyeet <user> <reason>',
  description: 'Unbans a member.',
  permissions: ['BAN_MEMBERS'],

  async callback ({ 
    message, 
    client, 
    args, 
    embed, 
  }): Promise<void> {
    const [userId, ...restArgs] = args

    const reason = restArgs.join(' ')

    const user = await client.users.fetch(
      userId.replace(/<@!([0-9]+)>/, '$1'),
    )

    const name = `${user.tag} (${user.id})`

    const reasonString = reason
      ? ` for \`${reason}\`.`
      : `.`

    message.delete().catch(console.error)

    try {
      await message.guild.members.unban(userId.replace(/<@!([0-9]+)>/, '$1'), reason)

      const logChannel = await message.guild.channels.resolve(config.channels.log) as TextChannel

      await logChannel.send(embed({
        title: 'Unyeet',
        description: `Member has been unyeeted${reasonString}`,
        
        footer: {
          "icon_url": user.avatarURL(),
          text: name,
        },
      }))
    } catch (error) {
      await message.channel.send(embed({
        title: 'Failed to unyeet member.',
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

export default yeet
