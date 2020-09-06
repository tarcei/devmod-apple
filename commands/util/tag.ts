import { Command } from '@types'

import { tags } from './tagsList'

const tagCommand: Command = {
  regex: /^(tag)\s/,
  usage: 'tag <tag>',
  description: 'Post a tag to the current channel.',

  async callback ({ message, embed, args }): Promise<void> {
    const [tag] = args

    await message.channel.send(embed({
      ...tags[tag],
    }))
  },
}

export default tagCommand
