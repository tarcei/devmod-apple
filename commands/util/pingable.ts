import { Command } from '@types'

import config from '../../config'

const pingable: Command = {
  regex: /^pingable$/,
  usage: 'pingable',
  description: 'List all pingable roles',

  async callback ({ message, embed }) {
    await message.channel.send(embed({
      title: 'Pingable Roles',
      description: Object
        .entries(config.roles.pingable)
        .map(([key]) => `\`${key}\``)
        .join('\n'),
    }))
  },
}

export default pingable
