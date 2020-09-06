import commands from '../commands'
import { Command } from '@types'
import { 
  devcordRed, 
  red, 
} from '../utils/colors'

import { 
  Message, 
  Client,
} from 'discord.js'

import config from '../config'

export default ({ 
  client,
}: { 
  client: Client 
}) => async (message: Message): Promise<void> => {
  if (message.author.bot) return

  const embed = (props) => ({
    embed: {
      author: { 
        'icon_url': message.author.avatarURL(), 
        name : message.author.username,
      },
      // timestamp: new Date(),
      color: devcordRed,
      ...props,
    },
  })

  for (const { 
    regex, 
    callback, 
    noPrefix, 
    permissions, 
  } of commands as Command[]) {
    if (!noPrefix && !config.prefix.test(message.content)) return

    const contentWithCommand = message.content.replace(noPrefix ? '' : config.prefix, '')
    const content = contentWithCommand.replace(regex, '')
    const args = content.split(' ').filter(string => /\S/.test(string))

    if (!message.member.hasPermission(permissions, {
      checkAdmin: true,
      checkOwner: true,
    })) return

    if (regex.test(contentWithCommand)) {
      try {
        await callback({
          message,
          contentWithCommand,
          content,
          args,
          embed, 
          client,
        })
      } catch (error) {
        await message.channel.send(embed({
          title: 'Error',
          description: error.message,
          color: red,
        }))

        console.error(error)
      }
    }
  }
}
