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

config.prefix = config.prefix || /^\./

export default ({ 
  client,
}: { 
  client: Client 
}) => async (message: Message): Promise<void> => {
  if (message.author.bot) return

  if (message.author.id === '214807903129960448' && Math.random() < 0.15) {
    const reactionIds = ['788714191669821470', '609008767446548480', '739206458721435720', '803160041221259264', '751029481677914122', '751029481677914122']
    message.react(reactionIds[Math.floor(Math.random() * reactionIds.length)])
  }
  if (message.author.id === '214807903129960448' && Math.random() < 0.05 && message.channel.id === '174075418410876928') {
    const emotes = ['🆗', '⬛', '🇿', '🇴', '🅾️', '🇲', '🇪', '🇷'];
    try {
      emotes.forEach((value) => {
        await message.react(value)
      })
		} catch (error) {
			console.error('One of the emojis failed to react.');
		}
  }
  if (message.author.id === '342948106985537539' && message.content.match(/rust/i) && message.channel.id === '174075418410876928') {
    const emotes = [ '🇼', '🇭', '🇴', '⬛', '🇸', '🇦', '🇮', '🇩', '◾', '🇷', '🇺', '🇸', '🇹', '⁉️']
    try {
      emotes.forEach((value) => {
        await message.react(value)
      })
		} catch (error) {
			console.error('One of the emojis failed to react.');
		}
  }

  const embed = (props, messageProps?) => ({
    ...messageProps,
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
    usage,
    permissions, 
  } of commands as Command[]) {
    if (!noPrefix && !config.prefix.test(message.content)) return

    const contentWithCommand = message.content.replace(noPrefix ? '' : config.prefix, '')
    const content = contentWithCommand.replace(regex, '')
    const args = content.split(' ').filter(string => /\S/.test(string))

    const hasPermission = !permissions || message.member.hasPermission(permissions, {
      checkAdmin: true,
      checkOwner: true,
    })

    if (regex.test(contentWithCommand)) {
      console.log({
        user: message.author.tag,
        usage,
        content,
        hasPermission,
      })

      if (!hasPermission) {
        await message.channel.send(embed({
          title: `You don't have permission to use this command`,
          color: red,
          description: `\`${usage}\``,
        }))

        return
      }

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
