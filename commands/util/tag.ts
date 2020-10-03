import { Command } from '@types'
import { red } from '../../utils/colors'
import { tags } from './tagsList'

const tagCommand: Command = {
  regex: /^(tag)\s/,
  usage: 'tag <tag>',
  description: 'Post a tag to the current channel.',

  async callback ({ message, embed, args }): Promise<void> {
    const [tag, ...restArgs] = args

    // await message.delete()

    if (!tags[tag]) {
      await message.channel.send(embed({
        description: 'This tag doesn\'t exist. Try `.tags` to get a list.',
        color: red,
      }))
    } else {
      await message.channel.send(embed({
        ...tags[tag],
      }, {
        content: restArgs.join(' '),
      }))
    }
  },
}

export default tagCommand
