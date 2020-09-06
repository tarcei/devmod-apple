import { Client } from 'discord.js'
import MessageHandler from './messageHandler'
import Secrets from '../config'

const client = new Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', MessageHandler({
  client,
}))

client.login(Secrets.token)
