import { Config } from './@types'

/*
  Everything other than the bot token is optional.
*/

export default <Config> {
  token: "BOT_TOKEN",

  prefix: /^\./,

  channels: {
    log: '665480338394316801',
    roles: '656990544139911168',
    reports: '656939063814914058',
  },

  roles: {
    muted: '656942795419942932',
    assignable: {
      '💻': '656994511943368724',
    },
  },
}
