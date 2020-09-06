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

    assignableEmbeds: [
      {
        title: 'Self Assignable Roles',

        description: 'Roles that have the word "Helper" are pingable and are used in channels in the Dev Zone category by users that are looking for help.'
          + 'You may add/remove these roles at any time. Do not add these roles if you do not want to be pinged by users looking for help.',
        
        items: {
          '💻': '656994511943368724',
        },
      },
    ],
  },
}
