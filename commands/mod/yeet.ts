import { Command } from '@types'
import config from '../../config'
import { red } from '../../utils/colors'
import { TextChannel } from 'discord.js'
// import { channels.log } from '@config'

const yeet: Command = {
  regex: /^(yeet|ban)\s/,
  usage: 'yeet <member> <reason>',
  description: 'Bans a member.',
  permissions: ["BAN_MEMBERS"],

  async callback ({ 
    message, 
    args, 
    embed, 
    client,
  }): Promise<void> {
    const [userId, ...restArgs] = args

    const snowflake = userId.replace(/<@!([0-9]+)>/, '$1')
    const reason = restArgs.join(' ')
    const user = await client.users.fetch(snowflake)
    const name = `${user.tag} (${user.id})`

    try {
      const member = await message.guild.members.fetch(snowflake)

      if (!member.bannable) {
        await message.channel.send(embed({
          title: 'This member is unbannable.',
          color: red,
          
          footer: {
            "icon_url": user.avatarURL(),
            text: name,
          },
        }))

        return
      }
    } catch (error) {
      console.log(error)
    }

    const reasonString = reason
      ? ` for \`${reason}\`.`
      : `.`

    message.delete().catch(console.error)

    await user.send(embed({
      title: `Yeeted`,
      description: `You've been yeeted from Devcord${reasonString}`,
    })).catch(console.error)

    try {
      await message.guild.members.ban(snowflake, {
        reason,
      })

      if (!config.channels?.log) return

      const logChannel = await message.guild.channels.resolve(config.channels.log) as TextChannel

      await logChannel.send(embed({
        title: 'Yeet',
        description: `<@${user.id}> has been yeeted${reasonString}`,
        
        footer: {
          "icon_url": user.avatarURL(),
          text: name,
        },
      }))
    } catch (error) {
      await message.channel.send(embed({
        title: 'Failed to yeet member.',
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
