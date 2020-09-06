import { Command } from '@types'

import { tags } from './tagsList'

const tagCommand: Command = {
  regex: /^(tag)\s/,
  usage: 'tag <tag>',
  description: 'Post a tag to the current channel.',

  async callback ({ message, embed, args }): Promise<void> {
    const [tag, ...restArgs] = args

    await message.delete()

    await message.channel.send(embed({
      ...tags[tag],
    }, {
      content: restArgs.join(' '),
    }))
  },
}

export default tagCommand
